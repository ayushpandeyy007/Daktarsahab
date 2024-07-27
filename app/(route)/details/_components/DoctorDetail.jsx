"use client";

import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import BookAppointment from "./BookAppointment";
import RatingForm from "./RatingForm";
import DoctorReviewsPage from "./DoctorReviewPage";
import { useEffect } from "react";
import axios from "axios";
function DoctorDetail({ doctor }) {
  const socialMediaList = [
    { id: 1, icon: "/fb.png", url: "" },
    { id: 2, icon: "/insta.png", url: "" },
    { id: 3, icon: "/whatsapp.png", url: "" },
  ];

  const doctorImage = doctor?.attributes?.image?.data?.attributes?.url;
  const [timeAndDate, setTimeAndDate] = useState(null);
  const fetchAppointment = async () => {
    try {
      const response = await axios.get(
        `https://doctor-appointment-admin-y94n.onrender.com/api/appointments?filters[doctor][id][$eq]=${doctor.id}&populate=*`
      );
      setTimeAndDate(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
      console.log("fwefwefwefwefgtbbetbhb", timeAndDate);

  useEffect(() => {
    fetchAppointment();
  }, []);
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row p-4 md:p-6">
          {doctorImage && (
            <div className="w-full md:w-1/3 h-64  relative mb-4 md:mb-0">
              <Image
                src={doctorImage}
                layout="fill"
                objectFit="cover"
                alt="doctor-image"
                className="rounded-lg"
              />
            </div>
          )}
          <div className="flex-1 md:ml-6 space-y-4">
            <h1 className="font-bold text-2xl md:text-3xl text-primary">
              {doctor?.attributes?.Name}
            </h1>
            <p className="flex items-center gap-2 text-gray-600">
              <GraduationCap className="text-primary w-5 h-5" />
              <span>
                {doctor?.attributes?.Year_of_Experience} years of Experience
              </span>
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <MapPin className="text-primary w-5 h-5" />
              <span>{doctor?.attributes?.Address}</span>
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-medium bg-primary/10 px-3 py-1 rounded-full text-primary">
                {doctor?.attributes?.categories?.data[0]?.attributes?.Name}
              </span>
              {socialMediaList.map((item) => (
                <Image
                  key={item.id}
                  src={item.icon}
                  width={24}
                  height={24}
                  alt={`social-media-icon-${item.id}`}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
            <div className="pt-4">
              <BookAppointment timeAndDate={timeAndDate} doctor={doctor} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 md:p-6 rounded-2xl">
        <h2 className="font-bold text-xl md:text-2xl mb-4 text-gray-800">
          About Me
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {doctor?.attributes?.About}
        </p>
      </div>
      <RatingForm doctorId={doctor.id} doctorName="Dr. John Doe" />
      <DoctorReviewsPage doctorId={doctor.id} />
    </div>
  );
}

export default DoctorDetail;
