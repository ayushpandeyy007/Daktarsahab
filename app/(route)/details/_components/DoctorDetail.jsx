import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

function DoctorDetail({ doctor }) {
  const socialMediaList = [
    { id: 1, icon: "/fb.png", url: "" },
    { id: 2, icon: "/insta.png", url: "" },
    { id: 3, icon: "/whatsapp.png", url: "" },
  ];

  const doctorImage = doctor?.attributes?.image?.data?.attributes?.url;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 sm:p-6">
          <div className="md:col-span-1">
            {doctorImage && (
              <div className="relative h-64 md:h-full w-full">
                <Image
                  src={doctorImage}
                  layout="fill"
                  objectFit="cover"
                  alt="doctor-image"
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">
              {doctor?.attributes?.Name}
            </h1>
            <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
              <GraduationCap className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
              <span>
                {doctor?.attributes?.Year_of_Experience} years of Experience
              </span>
            </p>
            <p className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
              <MapPin className="text-primary w-4 h-4 sm:w-5 sm:h-5" />
              <span>{doctor?.attributes?.Address}</span>
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              <span className="text-xs sm:text-sm font-medium bg-blue-100 px-2 sm:px-3 py-1 rounded-full text-primary">
                {doctor?.attributes?.categories?.data[0]?.attributes?.Name}
              </span>
              {socialMediaList.map((item) => (
                <Image
                  key={item.id}
                  src={item.icon}
                  width={20}
                  height={20}
                  alt={`social-media-icon-${item.id}`}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
            <div className="mt-4 sm:mt-6">
              <BookAppointment doctor={doctor} />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 sm:p-6 mt-4">
          <h2 className="font-bold text-xl sm:text-2xl mb-3 sm:mb-4 text-gray-800">
            About Me
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {doctor?.attributes?.About}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
