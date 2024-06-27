"use client"

import GlobalApi from "@/app/_utils/GlobalAPI";
import React, { useEffect, useState } from "react";
import DoctorDetail from "../_components/DoctorDetail";
import DoctorSuggestionList from "../_components/DoctorSuggestionList";

function Details({ params }) {
  const [doctor, setDoctor] = useState(null);
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    // Fetch details of the main doctor
    GlobalApi.getDoctorById(params.recordId).then((resp) => {
      setDoctor(resp.data.data);
    });

    // Fetch list of all doctors
    GlobalApi.getDoctorList().then((resp) => {
      // Filter out the main doctor from the list
      const filteredList = resp.data.data.filter(
        (doc) => doc.id !== parseInt(params.recordId)
      );
      setDoctorList(filteredList);
    });
  }, [params.recordId]); // Trigger effect whenever recordId changes

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-[22px]">Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Doctor Detail */}
        <div className="col-span-3">
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>
        {/* Doctor Suggestion*/}
        <div>
          <DoctorSuggestionList doctor={doctor} doctorList={doctorList} />
        </div>
      </div>
    </div>
  );
}

export default Details;
