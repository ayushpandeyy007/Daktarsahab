import Image from "next/image";
import React from "react";

const DoctorList = ({ doctorList, heading = "popluar doctors" }) => {
  return (
    <div className="mb-10  m-5">
      <h2 className="font-bold text-xl ">{heading}</h2>
      <div className="grid grid-cols-2 gap-7 mt-4 md:grid-cols-2 lg:grid-cols-4">
        {doctorList.length > 0
          ? doctorList.map((doctor, index) => (
              <div
                className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out"
                key={index}
              >
                <Image
                  src={doctor?.attributes?.image?.data?.attributes?.url}
                  alt="doctor"
                  width={500}
                  height={500}
                  className="h-[200px] w-full object-cover rounded:lg"
                />
                <div className="mt-3 items-baseline flex flex-col gap-1">
                  <h2 className="text-[10px] bg-blue-100 px-2 p-1 rounded-full text-primary">
                    {doctor?.attributes?.categories.data[0]?.attributes?.Name}
                  </h2>
                  <h2 className="font-bold">{doctor.attributes?.Name}</h2>
                  <h2 className="text-primary text-sm">
                    {doctor.attributes?.Year_of_Experience}
                  </h2>
                  <h2 className="text-gray-500 text-sm">
                    {doctor.attributes?.Address}
                  </h2>

                  <h2 className="p-2 px-3 border border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white ">
                    Book Now
                  </h2>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className="h-[220px] animate-pulse bg-slate-400 w-full rounded-lg"></div>
            ))}
      </div>
    </div>
  );
};

export default DoctorList;
