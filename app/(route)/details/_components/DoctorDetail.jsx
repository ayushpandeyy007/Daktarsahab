import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

function DoctorDetail({ doctor }) {
  console.log(doctor, "Doctor details");

  const socialMediaList = [
    {
      id: 1,
      icon: "/fb.png",
      url: "",
    },
    {
      id: 2,
      icon: "/insta.png",
      url: "",
    },
    {
      id: 3,
      icon: "/whatsapp.png",
      url: "",
    },
  ];

  const doctorImage = doctor?.attributes?.image?.data?.attributes?.url;

  return (
    <div className="container mx-auto mb-10  px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-2 p-4  mt-5 rounded-lg">
        {/* Doctor Image */}
        <div className="md:col-span-1">
          {doctorImage && (
            <div>
              <Image
                src={doctorImage}
                width={350}
                height={350}
                alt="doctor-image"
                className="rounded-lg   object-cover"
              />
            </div>
          )}
        </div>
        {/* Doctor Information */}
        <div className="md:col-span-2 mt-5 md:mt-[10px] flex flex-col gap-3">
          <h2 className="font-bold text-xl md:text-2xl">
            {doctor?.attributes?.Name}
          </h2>
          <h2 className="flex items-center gap-2 text-gray-500 text-sm md:text-md">
            <GraduationCap />
            <span>
              {doctor?.attributes?.Year_of_Experience} years of Experience
            </span>
          </h2>
          <h2 className="flex items-center gap-2 text-gray-500 text-sm md:text-md">
            <MapPin />
            <span>{doctor?.attributes?.Address}</span>
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            <h2 className="text-[10px] bg-blue-100 px-2 p-1 rounded-full text-primary">
              {doctor?.attributes?.categories?.data[0]?.attributes?.Name}
            </h2>
            {socialMediaList.map((item) => (
              <Image
                src={item.icon}
                key={item.id}
                width={30}
                height={30}
                alt={`social-media-icon-${item.id}`}
              />
            ))}
          </div>
          <div className="mt-4 md:flex md:items-center ">
            <BookAppointment  doctor={doctor}/>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="p-4 border rounded-lg">
          <h2 className="font-bold text-lg md:text-xl">About Me</h2>
          <p className="text-gray-500 tracking-wide mt-2 text-sm md:text-base">
            {doctor?.attributes?.About}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
