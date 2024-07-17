import { Calendar, Clock, MapPin, Notebook } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import CancelAppointment from "./CancelAppointment";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { toast } from "sonner";
import { motion } from "framer-motion";

const BookingList = ({ bookingList, expired, updateRecord }) => {
  const onDeleteBooking = (item) => {
    GlobalAPI.deleteBooking(item.id).then((resp) => {
      if (resp) {
        toast("Booking deleted");
        updateRecord();
      }
    });
  };

  return (
    <div className="space-y-6">
      {bookingList?.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white shadow-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative flex-shrink-0">
              <Image
                src={
                  item.attributes.doctor?.data.attributes?.image?.data
                    ?.attributes?.url
                }
                className="rounded-full h-24 w-24 object-cover border-4 border-blue-100 shadow-md"
                width={96}
                height={96}
                alt={`Dr. ${item.attributes.doctor.data.attributes.Name}`}
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-grow w-full md:w-auto">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
                  Dr. {item.attributes.doctor.data.attributes.Name}
                </h2>
                {!expired && (
                  <CancelAppointment
                    onContinueClick={() => onDeleteBooking(item)}
                  />
                )}
              </div>
              <div className="space-y-3 text-gray-600">
                <InfoItem icon={<MapPin className="w-5 h-5 text-blue-500" />}>
                  {item.attributes.doctor.data.attributes.Address}
                </InfoItem>
                <InfoItem
                  icon={<Calendar className="w-5 h-5 text-green-500" />}
                >
                  Appointment on:{" "}
                  <strong className="text-gray-800">
                    {moment(item.attributes.Date).format("DD MMM, YYYY")}
                  </strong>
                </InfoItem>
                <InfoItem icon={<Clock className="w-5 h-5 text-yellow-500" />}>
                  At Time:{" "}
                  <strong className="text-gray-800">
                    {item.attributes.Time}
                  </strong>
                </InfoItem>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <InfoItem
                    icon={<Notebook className="w-5 h-5 text-purple-500" />}
                  >
                    <span className="text-sm italic">
                      {item.attributes.Note || "No additional notes"}
                    </span>
                  </InfoItem>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const InfoItem = ({ icon, children }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-gray-100 p-1.5 rounded-full">{icon}</div>
    <span className="text-sm">{children}</span>
  </div>
);

export default BookingList;
