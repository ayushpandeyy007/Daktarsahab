"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import { useEffect, useState } from "react";
import GlobalAPI from "./_utils/GlobalAPI";
import Footer from "./_components/Footer";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  }, []);
  const getDoctorList = () => {
    GlobalAPI.getDoctorList().then((resp) => {
      console.log(resp.data.data, "cjeiurfr");
      setDoctorList(resp.data.data);
    });
  };

  return (
    <div>
      <Hero />
      <CategorySearch />
      <DoctorList doctorList={doctorList} />
    </div>
  );
}
