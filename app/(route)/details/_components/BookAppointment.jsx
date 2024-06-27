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
import { CalendarDays, Clock } from "lucide-react"; // Import Clock from lucide-react
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

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeSlot(timeList);
  };

  const isPastDay = (day) => {
    return day < new Date().setHours(0, 0, 0, 0); // Ensure to compare only the date part
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
        if (resp) {
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
                    className="rounded-md border "
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
            onClick={() => saveBooking()}
            type="button"
            disabled={!(date && selectedTimeSlot)}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
