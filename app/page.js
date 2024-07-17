"use client";

import { useEffect, useState } from "react";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import GlobalAPI from "./_utils/GlobalAPI";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalAPI.getDoctorList().then((resp) => {
      console.log(resp.data.data, "Doctor List");
      setDoctorList(resp.data.data);
    });
  };

  return (
    <div className="space-y-12  px-4 md:px-8 lg:px-16 py-8">
      <Hero />
      <CategorySearch />
      <DoctorList doctorList={doctorList} />
    </div>
  );
}
