"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import GlobalAPI from "../_utils/GlobalAPI";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CategorySearch() {
  const [categoryList, setCategoryList] = useState([]);
  const pathname = usePathname();
  const selectedCategory = decodeURIComponent(pathname.split("/")[2]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalAPI.getCategory().then((resp) => {
      console.log(resp);
      setCategoryList(resp.data.data);
    });
  };

  return (
    <div className="mb-10 items-center px-5 flex flex-col gap-4">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <h2 className="text-gray-400 text-xl">
        search your doctor and book an appointment
      </h2>

      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </div>
      {/* display list of categories */}
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
        {categoryList.length > 0
          ? categoryList.map(
              (item, index) =>
                index < 6 && (
                  <Link
                    href={`/search/${encodeURIComponent(item.attributes.Name)}`}
                    key={index}
                    className={`flex flex-col text-center items-center p-5 m-2 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out cursor-pointer ${
                      selectedCategory === item.attributes.Name
                        ? "bg-blue-100"
                        : "bg-blue-50"
                    }`}
                  >
                    <Image
                      src={item.attributes?.Icon?.data.attributes.url}
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <label className="text-blue-600 text-sm">
                      {item.attributes.Name}
                    </label>
                  </Link>
                )
            )
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-[100px] w-[100px] m-2 animate-pulse bg-slate-300 rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default CategorySearch;
