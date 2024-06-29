"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalAPI from "@/app/_utils/GlobalAPI";
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
    <div className="mt-5 flex flex-col overflow-hidden h-[calc(100vh-100px)] md:h-auto">
      <Command className="border rounded-lg shadow-lg">
        <CommandInput
          placeholder="Search categories"
          className="p-3 text-sm md:text-base border-b"
        />
        <CommandList className="max-h-[60vh] md:max-h-[calc(100vh-200px)] overflow-y-auto">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Categories" className="px-2 py-3">
            {categoryList?.map((item, index) => (
              <CommandItem key={index} className="px-2 py-1">
                <Link
                  href={`/search/${encodeURIComponent(item.attributes.Name)}`}
                  className={`
                    flex items-center gap-3 p-2 
                    text-sm md:text-base text-blue-600 
                    rounded-md cursor-pointer w-full 
                    transition-all duration-200 
                    hover:bg-blue-50 hover:scale-105
                    ${
                      category === item.attributes.Name
                        ? "bg-blue-100 font-medium"
                        : ""
                    }
                  `}
                >
                  <Image
                    src={item?.attributes?.Icon?.data?.attributes?.url}
                    alt={item.attributes.Name}
                    width={25}
                    height={25}
                    className="object-contain"
                  />
                  <span>{item.attributes.Name}</span>
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
