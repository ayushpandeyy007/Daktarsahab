"use client";
import DoctorList from "@/app/_components/DoctorList";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import React, { useEffect, useState } from "react";

const Search = ({ params }) => {
  const [doctorList, setDoctorList] = useState([]);
  const categoryName = decodeURIComponent(params.cname);

  useEffect(() => {
    console.log("Category changed:", categoryName);
    getDoctors();
  }, [categoryName]);

  const getDoctors = () => {
    GlobalAPI.getDoctorByCategory(categoryName)
      .then((resp) => {
        console.log(`API response for ${categoryName}:`, resp.data);
        if (resp?.data?.data) {
          setDoctorList(resp.data.data);
        }
      })
      .catch((error) => {
        console.error(`Error fetching doctors for ${categoryName}:`, error);
      });
  };

  return (
    <div className="mt-5">
      <DoctorList heading={categoryName} doctorList={doctorList} />
    </div>
  );
};

export default Search;
