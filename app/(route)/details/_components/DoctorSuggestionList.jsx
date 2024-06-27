import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const DoctorSuggestionList = ({doctor, doctorList }) => {
  return (
    <div className="px-4">
      <div>
        <h2 className="font-bold text-[22px] mt-[-29px] mb-3">Suggestions</h2>
        <div className="flex flex-col gap-3 w-[300px]">
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
                    className="h-[200px] w-full object-cover rounded-lg"
                  />
                  <div className="mt-3 items-baseline flex flex-col gap-1">
                    {doctor?.attributes?.categories?.data[0]?.attributes
                      ?.Name && (
                      <h2 className="text-[10px] bg-blue-100 px-2 p-1 rounded-full text-primary">
                        {
                          doctor?.attributes?.categories?.data[0]?.attributes
                            ?.Name
                        }
                      </h2>
                    )}
                    <h2 className="font-bold">{doctor.attributes?.Name}</h2>
                    <h2 className="text-primary text-sm">
                      {doctor.attributes?.Year_of_Experience}
                    </h2>
                    <h2 className="text-gray-500 text-sm">
                      {doctor.attributes?.Address}
                    </h2>
                    <Link href={"/details/" + doctor?.id} className="w-full">
                      <h2 className="p-2 px-3 border border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white">
                        Book Now
                      </h2>
                    </Link>
                  </div>
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[220px] animate-pulse bg-slate-300 w-full rounded-lg"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSuggestionList