// app/explore/page.js
"use client";

import React from "react";
import Image from "next/image";
import CategorySearch from "@/app/_components/CategorySearch";

const ExplorePage = () => {

  return (
    <div className=" bg-gray-100">
      <CategorySearch />
    </div>
  );
};

export default ExplorePage;
