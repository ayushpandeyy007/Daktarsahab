"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const MyBooking = () => {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    user && getUserBookingList();
  }, [user]);

  const getUserBookingList = () => {
    GlobalAPI.getUserBookingList(user.email).then((resp) => {
      setBookingList(resp.data.data);
    });
  };

  const filterUserBooking = (type) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to the start of today

    return bookingList.filter((item) => {
      const bookingDate = new Date(item.attributes.Date);
      bookingDate.setHours(0, 0, 0, 0); // Set to the start of the booking day

      if (type === "upcoming") {
        return bookingDate >= now;
      } else {
        return bookingDate < now;
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 bg-white shadow-md rounded-full p-1">
            <TabsTrigger
              value="upcoming"
              className="w-1/2 py-3 text-sm font-medium rounded-full transition-all duration-200 data-[state=active]:bg-indigo-600 hover:bg-indigo-700 hover:text-white data-[state=active]:text-white"
            >
              <Calendar className="w-4 h-4 mr-2 inline-block" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="w-1/2 py-3 text-sm font-medium rounded-full transition-all duration-200 data-[state=active]:bg-indigo-600 hover:bg-indigo-700 hover:text-white data-[state=active]:text-white"
            >
              <Clock className="w-4 h-4 mr-2 inline-block" />
              Expired
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <BookingList
              updateRecord={getUserBookingList}
              expired={false}
              bookingList={filterUserBooking("upcoming")}
            />
          </TabsContent>
          <TabsContent value="expired">
            <BookingList
              updateRecord={getUserBookingList}
              expired={true}
              bookingList={filterUserBooking("expired")}
            />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default MyBooking;
