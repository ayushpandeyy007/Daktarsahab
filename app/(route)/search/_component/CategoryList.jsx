"use client";

import GlobalAPI from "@/app/_utils/GlobalAPI";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CategoryList = () => {
  const params = usePathname();
  const category = decodeURIComponent(params.split("/")[2]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalAPI.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };

  return (
    <div className="h-[calc(100vh-100px)] mt-5 flex flex-col overflow-hidden">
      <Command className="border-r shadow-md">
        <CommandInput placeholder="Search" />
        <CommandList className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList &&
              categoryList.map((item, index) => (
                <CommandItem key={index}>
                  <Link
                    href={`/search/${encodeURIComponent(item.attributes.Name)}`}
                    className={`p-2 flex gap-2 text-[14px] items-center text-blue-600 rounded-md cursor-pointer w-full ${
                      category === decodeURIComponent(item.attributes.Name)
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <Image
                      src={item.attributes?.Icon?.data.attributes.url}
                      alt="icon"
                      width={25}
                      height={25}
                    />
                    <label>{item.attributes.Name}</label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
