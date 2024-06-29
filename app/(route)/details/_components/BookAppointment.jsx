import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { CalendarDays, Clock } from "lucide-react";
import {
  useKindeAuth,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { Toaster, toast } from "sonner";

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const { user } = useKindeBrowserClient();
  const [note, setNote] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  useEffect(() => {
    getTime();
    checkPaymentStatus();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }
    setTimeSlot(timeList);
  };

  const checkPaymentStatus = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("paymentStatus");

    if (paymentStatus === "complete") {
      setIsPaymentComplete(true);
      setIsPaymentProcessing(false);
      toast("Payment completed successfully!");

      // Remove the paymentStatus parameter from the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  };

  const isPastDay = (day) => {
    return day < new Date().setHours(0, 0, 0, 0);
  };

  const generateFonepayParams = async () => {
    const PID = "fonepay123"; // Your Fonepay merchant ID
    const sharedSecretKey = "fonepay"; // Your Fonepay secret key
    const PRN = `PRN${Date.now()}${Math.random().toString(36).substring(2, 7)}`;
    const MD = "P";
    const AMT = "100"; // Replace with actual appointment cost
    const CRN = "NPR";
    const DT = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const R1 = note || "Appointment Booking";
    const R2 = selectedTimeSlot || "N/A";
    const RU = `http://localhost:3000/payment-successful`; // Return to the same page

    const message = `${PID},${MD},${PRN},${AMT},${CRN},${DT},${R1},${R2},${RU}`;

    // Convert the message and key to Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const key = encoder.encode(sharedSecretKey);

    // Create the HMAC
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      key,
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );
    const signature = await window.crypto.subtle.sign("HMAC", cryptoKey, data);

    // Convert the signature to hex string
    const DV = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return { PID, PRN, MD, AMT, CRN, DT, R1, R2, RU, DV };
  };

  const initiatePayment = async () => {
    setIsPaymentProcessing(true);
    const params = await generateFonepayParams();
    const paymentUrl = "https://dev-clientapi.fonepay.com/api/merchantRequest"; // Use production URL in production
    const queryString = new URLSearchParams(params).toString();

    // Redirect to the payment URL
    window.location.href = `${paymentUrl}?${queryString}`;
  };

  const saveBooking = () => {
    return new Promise((resolve, reject) => {
      const data = {
        data: {
          UserName: user.given_name + " " + user.family_name,
          Email: user.email,
          Time: selectedTimeSlot,
          Date: date,
          doctor: doctor.id,
          Note: note,
        },
      };

      GlobalAPI.bookAppointment(data)
        .then((resp) => {
          console.log(resp);
          if (resp && resp.status === 200) {
            GlobalAPI.sendEmail(data).then((emailResp) => {
              console.log(emailResp);
            });
            toast("Booking confirmation Email will be sent to your mail");
            resolve(true);
          } else {
            reject(new Error("Booking failed"));
          }
        })
        .catch((error) => {
          console.error("Booking failed:", error);
          toast("Booking failed. Please try again.");
          reject(error);
        });
    });
  };

  const handleBookingAndPayment = async () => {
    try {
      setIsPaymentProcessing(true);
      await saveBooking();
      await initiatePayment();
    } catch (error) {
      console.error("Error during booking or payment:", error);
      toast("An error occurred. Please try again.");
      setIsPaymentProcessing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                {/* Calendar */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-3 items-center">
                    <CalendarDays className="text-primary h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>
                {/* Time slot */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-3">
                    <Clock className="text-primary h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                    {timeSlot?.map((item, index) => (
                      <h2
                        onClick={() => setSelectedTimeSlot(item.time)}
                        key={index}
                        className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${
                          item.time === selectedTimeSlot
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
          >
            Note:
          </label>
          <textarea
            name="Note"
            id="note"
            rows={4}
            cols={67}
            className="border-2 mt-1 p-1"
            placeholder="Enter your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <DialogFooter className="sm:justify-end items-center">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-red-500 border border-red-500"
            >
              Close
            </Button>
          </DialogClose>

          <Button
            onClick={handleBookingAndPayment}
            type="button"
            disabled={isPaymentProcessing || isPaymentComplete}
          >
            {isPaymentProcessing
              ? "Processing..."
              : isPaymentComplete
              ? "Booking Completed"
              : "Book and Pay"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
