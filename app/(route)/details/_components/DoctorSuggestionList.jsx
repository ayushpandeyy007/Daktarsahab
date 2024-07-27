import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CalendarDays, MapPin, Star } from "lucide-react";

const DoctorSuggestionList = ({ doctorList }) => {
  return (
    <div className="px-10 mt-[-35px]  bg-gray-100  w-[350px] ">
      <h2 className="font-bold text-2xl mb-6">Suggestions</h2>
      <div className="grid grid-cols-1  gap-6">
        {doctorList?.length > 0
          ? doctorList.map((doctor) => (
              <div
                key={doctor.id}
                className=" flex flex-col justify-center items-center align-middle bg-white rounded-xl  shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={
                      doctor?.attributes?.image?.data?.attributes?.url ||
                      "/placeholder-doctor.jpg"
                    }
                    className="m-4  rounded-full h-24 w-24 object-cover border-4 border-blue-100"
                    width={96}
                    height={96}
                    alt="doctor-image"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {doctor.attributes?.Name}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    <span>
                      {doctor.attributes?.Year_of_Experience} years of
                      experience
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{doctor.attributes?.Address}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 mr-1 ${
                          i < 4 ? "fill-current" : ""
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">(4.0)</span>
                  </div>
                  <Link
                    href={`/details/${doctor.id}`}
                    className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))
          : [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse"
              >
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DoctorSuggestionList;
