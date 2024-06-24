"use client";
import DoctorList from "@/app/_components/DoctorList";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import React, { useEffect, useState } from "react";

const Search = ({ params }) => {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    console.log("Category changed:", params.cname);
    getDoctors();
  }, [params.cname]);

  const getDoctors = () => {
    GlobalAPI.getDoctorByCategory(params.cname)
      .then((resp) => {
        console.log(`API response for ${params.cname}:`, resp.data);
        if (resp?.data?.data) {
          setDoctorList(resp.data.data);
        }
      })
      .catch((error) => {
        console.error(`Error fetching doctors for ${params.cname}:`, error);
      });
  };

  return (
    <div className="mt-5">
      <DoctorList heading={params.cname} doctorList={doctorList} />
    </div>
  );
};

export default Search;
