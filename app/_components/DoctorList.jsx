import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CalendarDays, MapPin, Star } from "lucide-react"; // Import icons

const DoctorList = ({ doctorList, heading = "Popular Doctors" }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8 rounded-xl shadow-md">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorList?.length > 0
            ? doctorList.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-[270px]">
                    <Image
                      src={
                        doctor?.attributes?.image?.data?.attributes?.url ||
                        "/placeholder-doctor.jpg"
                      }
                      layout="fill"
                      objectFit="cover"
                      alt={doctor.attributes?.Name}
                    />
                    {doctor?.attributes?.categories?.data[0]?.attributes
                      ?.Name && (
                      <span className="absolute top-4 right-4 text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
                        {
                          doctor?.attributes?.categories?.data[0]?.attributes
                            ?.Name
                        }
                      </span>
                    )}
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
                      <Star className="w-5 h-5 mr-1 fill-current" />
                      <Star className="w-5 h-5 mr-1 fill-current" />
                      <Star className="w-5 h-5 mr-1 fill-current" />
                      <Star className="w-5 h-5 mr-1 fill-current" />
                      <Star className="w-5 h-5 mr-1" />
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
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
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
    </div>
  );
};

export default DoctorList;
