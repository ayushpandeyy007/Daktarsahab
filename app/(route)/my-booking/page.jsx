"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const MyBooking = () => {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    user && getUserBookingList();
  }, [user]);
  const getUserBookingList = () => {
    GlobalAPI.getUserBookingList(user.email).then((resp) => {
      console.log(resp.data.data);
      setBookingList(resp.data.data);
    });
  };

  const filterUserBooking = (type) => {
    const result = bookingList.filter((item) =>
      type === "upcoming"
        ? new Date(item.attributes.Date) >= new Date()
        : new Date(item.attributes.Date) < new Date()
    );
    console.log(result);
    return result;
  };

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h1 className="font-bold text-2xl">My Bookings</h1>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            updateRecord={() => getUserBookingList()}
            expired={false}
            bookingList={filterUserBooking("upcoming")}
          />{" "}
        </TabsContent>
        <TabsContent value="expired">
          <BookingList
            updateRecord={() => getUserBookingList()}
            expired={true}
            bookingList={filterUserBooking("expired")}
          />{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooking;
