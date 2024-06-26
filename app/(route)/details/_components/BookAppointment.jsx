import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog } from '@/components/ui/dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
 
} from '@/components/ui/dialog';
import { CalendarDays, Clock } from 'lucide-react'; // Import Clock from lucide-react
import { getTime } from 'date-fns';
import { DialogClose } from '@radix-ui/react-dialog';

function BookAppointment() {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot,setSeledted]= useState([]);

  useEffect(() => {
    generateTimeSlots();
  }, []);

  const generateTimeSlots = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM',
      });
      timeList.push({
        time: i + ':30 AM',
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ':00 PM',
      });
      timeList.push({
        time: i + ':30 PM',
      });
    }
    setTimeSlot(timeList);
  };
const isPastDay=(day)=>{
    return day<new Date();
}
  return (
    <Dialog>
      <DialogTrigger>
        <Button className='mt-3 rounded-full'>Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
                {/* Calendar */}
                <div className='flex flex-col gap-3 items-baseline'>
                  <h2 className='flex gap-3 items-center'>
                    <CalendarDays className='text-primary h-5 w-5' />
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
                <div className='mt-3 md:mt-0'>
                  <h2 className='flex gap-2 items-center mb-3'>
                    <Clock className='text-primary h-5 w-5' />
                    Select Time Slot
                  </h2>
                  <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                    {timeSlot?.map((item, index) => (
                      <h2 
                      onClick={()=>selectedTimeSlot(item.time)}
                      key={index} className={`first-letter:'p-2 border cursor-pointer
                      tetxt-center hover:bg-primary hover:text-white
                      rounded-full
                      ${item.time==selectedTimeSlot&&'bg-primary text-white'}`}>
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm: justify-start">
            <DialogClose asChild>
          <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
