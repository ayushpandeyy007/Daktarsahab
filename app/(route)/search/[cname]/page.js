"use client";

import React, { useEffect, useState } from "react";
import DoctorList from "@/app/_components/DoctorList";
import GlobalAPI from "@/app/_utils/GlobalAPI";

const Search = ({ params }) => {
  const [doctorList, setDoctorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryName = decodeURIComponent(params.cname);

  useEffect(() => {
    console.log("Category changed:", categoryName);
    getDoctors();
  }, [categoryName]);

  const getDoctors = () => {
    setIsLoading(true);
    GlobalAPI.getDoctorByCategory(categoryName)
      .then((resp) => {
        console.log(`API response for ${categoryName}:`, resp.data);
        if (resp?.data?.data) {
          setDoctorList(resp.data.data);
        }
      })
      .catch((error) => {
        console.error(`Error fetching doctors for ${categoryName}:`, error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className=" mt-5 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {categoryName} Doctors
      </h1>
      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <DoctorList heading={categoryName} doctorList={doctorList} />
      )}
    </div>
  );
};

export default Search;
