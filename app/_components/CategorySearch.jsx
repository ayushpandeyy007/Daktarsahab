"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlobalAPI from "../_utils/GlobalAPI";

function CategorySearch() {
  const [categoryList, setCategoryList] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const selectedCategory = decodeURIComponent(pathname.split("/")[2]);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [searchTerm, categoryList]);

  const getCategoryList = () => {
    GlobalAPI.getCategory().then((resp) => {
      console.log(resp);
      setCategoryList(resp.data.data);
      setFilteredCategories(resp.data.data);
    });
  };

  const filterCategories = () => {
    const filtered = categoryList.filter((category) =>
      category.attributes.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSearch = () => {
    filterCategories();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-md">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Search Doctors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find and book appointments with top-rated doctors in your area
          </p>
        </div>

        <div className="flex gap-2 max-w-xl mx-auto">
          <Input
            placeholder="Search categories..."
            className="flex-grow text-lg py-3 px-4 rounded-l-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-full px-6"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </div>

        <div className="  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((item) => (
              <Link
                href={`/search/${encodeURIComponent(item.attributes.Name)}`}
                key={item.id}
                className={`p-4 rounded-xl  border-2 text-center hover:shadow-lg transition-all duration-300 ${
                  selectedCategory === item.attributes.Name
                    ? "bg-indigo-100 border-indigo-500"
                    : "bg-white border-gray-200 hover:border-indigo-300"
                }`}
              >
                <div className="flex flex-col  items-center space-y-2">
                  <Image
                    src={
                      item.attributes?.Icon?.data?.attributes?.url ||
                      "/placeholder.png"
                    }
                    width={40}
                    height={40}
                    alt={item.attributes.Name}
                    className="mb-1"
                  />
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {item.attributes.Name}
                  </h3>
                </div>
              </Link>
            ))
          ) : categoryList.length > 0 ? (
            <p className="col-span-full text-center text-lg text-gray-600">
              No categories found matching your search.
            </p>
          ) : (
            [1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border-2 border-gray-200 text-center animate-pulse"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CategorySearch;
