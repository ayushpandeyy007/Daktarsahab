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

function BookAppointment({ doctor, timeAndDate }) {
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

  const isPastHour = (time) => {
    const now = new Date();
    const [hour, period] = time.split(" ");
    let [hours, minutes] = hour.split(":").map(Number);
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const appointmentDate = new Date(date);
    appointmentDate.setHours(hours, minutes);

    return appointmentDate < now;
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
    const RU = process.env.NEXT_PUBLIC_PAYMENT_RETURN_URL; // Return to the same page

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
          if (resp && resp.status === 200) {
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

  const validateBookingData = () => {
    // UserName validation
    if (!user.given_name || !user.family_name) {
      toast("Please provide your full name.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
      toast("Please provide a valid email address.");
      return false;
    }

    // Time slot validation
    if (!selectedTimeSlot) {
      toast("Please select a time slot.");
      return false;
    }

    // Date validation
    if (!date || isPastDay(date)) {
      toast("Please select a valid future date.");
      return false;
    }

    // Doctor validation
    if (!doctor || !doctor.id) {
      toast("Invalid doctor selection.");
      return false;
    }

    // Note validation (optional)
    if (note && note.length > 500) {
      // Assuming a max length of 500 characters
      toast("Note is too long. Please keep it under 500 characters.");
      return false;
    }

    // Check if the selected time slot is already booked on the same date
    const isTimeSlotBooked = timeAndDate.data.some((item) => {
      const itemDate = new Date(item.attributes.Date).toLocaleDateString();
      const selectedDate = date.toLocaleDateString();
      return (
        item.attributes.Time === selectedTimeSlot && itemDate === selectedDate
      );
    });

    if (isTimeSlotBooked) {
      toast(
        "The selected time slot is already booked for this date. Please choose another time."
      );
      return false;
    }

    // Check if the selected time slot is in the past
    if (isPastHour(selectedTimeSlot)) {
      toast(
        "The selected time slot is in the past. Please choose a valid time."
      );
      return false;
    }

    return true;
  };

  const handleBookingAndPayment = async () => {
    if (!validateBookingData()) {
      return; // Stop the process if validation fails
    }

    try {
      setIsPaymentProcessing(true);
      await saveBooking();

      // Store booking data in localStorage before initiating payment
      const bookingData = {
        data: {
          UserName: user.given_name + " " + user.family_name,
          Email: user.email,
          Time: selectedTimeSlot,
          Date: date,
          doctor: doctor.id,
          Note: note,
        },
      };
      localStorage.setItem("bookingData", JSON.stringify(bookingData));

      await initiatePayment();
    } catch (error) {
      console.error("Error during booking or payment:", error);
      toast("An error occurred. Please try again.");
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="mt-3 bg-indigo-600 rounded-full">
            Book Appointment
          </Button>
        </DialogTrigger>
        <DialogContent className="w-11/12 max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] h-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Book Appointment
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Calendar */}
                  <div className="w-full md:w-1/2">
                    <h2 className="flex gap-2 items-center mb-2 text-lg font-medium">
                      <CalendarDays className="text-primary h-5 w-5" />
                      Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={isPastDay}
                      className="rounded-md border w-full"
                    />
                  </div>
                  {/* Time slot */}
                  <div className="w-full md:w-1/2">
                    <h2 className="flex gap-2 items-center mb-2 text-lg font-medium">
                      <Clock className="text-primary h-5 w-5" />
                      Select Time Slot
                    </h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-3 max-h-[200px] overflow-y-auto">
                      {timeSlot?.map((item, index) => (
                        <button
                          onClick={() => setSelectedTimeSlot(item.time)}
                          key={index}
                          className={`p-2 text-sm border rounded-full hover:bg-primary hover:text-white transition-colors ${
                            item.time === selectedTimeSlot
                              ? "bg-primary text-white"
                              : "bg-white text-gray-800"
                          } ${
                            isPastHour(item.time)
                              ? "bg-gray-300 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={isPastHour(item.time)}
                        >
                          {item.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Note:
            </label>
            <textarea
              name="Note"
              id="note"
              rows={3}
              className="w-full border-2 rounded-md p-2 text-sm"
              placeholder="Enter your note here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto border border-gray-300"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={handleBookingAndPayment}
              type="button"
              disabled={isPaymentProcessing || isPaymentComplete}
              className="w-full sm:w-auto bg-primary text-white"
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
      <Toaster />
    </div>
  );
}

export default BookAppointment;
