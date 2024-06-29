"use client";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, X } from "lucide-react";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useKindeBrowserClient();

  const MenuItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Explore", path: "/explore" },
    { id: 3, name: "Contact Us", path: "/contact" },
  ];

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className="bg-white shadow-md p-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={180}
                height={80}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              onClick={() => setIsDrawerOpen(true)}
              className="bg-white p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <nav className="hidden md:flex space-x-10">
            {MenuItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="text-lg font-medium text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-lg font-medium text-gray-700 ">
                  Welcome, {user.given_name}
                </span>
                <Popover className="relative">
                  <PopoverTrigger>
                    <div className="flex items-center space-x-4 bg-gray-100 rounded-full pl-4 pr-2 py-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                      <span className="text-lg font-medium  text-gray-700 ">
                        {user.given_name} {user.family_name}
                      </span>

                      <Image
                        src={user?.picture}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full "
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className=" right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Link
                        href="/myprofile"
                        className="flex items-center px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Profile
                      </Link>
                      <Link
                        href="/my-booking"
                        className="flex items-center px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        My Bookings
                      </Link>
                      <LogoutLink className="flex items-center px-4 py-2 text-lg text-red-600 hover:bg-red-50 transition-colors duration-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Logout
                      </LogoutLink>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <LoginLink>
                <Button className="whitespace-nowrap inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
                  Get Started
                </Button>
              </LoginLink>
            )}
          </div>
        </div>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div
            className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 border-b">
                <Button
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </Button>
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={40}
                  className="mx-auto"
                />
              </div>
              <nav className="flex-grow p-6 overflow-y-auto">
                {MenuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="block py-3 px-4 mb-2 rounded-lg text-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <span className="text-lg font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
              <div className="p-6 border-t">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Image
                        src={user?.picture || "/default-avatar.png"}
                        alt="profile-image"
                        width={48}
                        height={48}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold text-lg text-gray-800">
                          {user.given_name} {user.family_name}
                        </p>
                        <p className="text-base text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="block py-2 px-4 rounded-lg text-lg text-gray-700 hover
transition-colors"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/my-booking"
                      className="block py-2 px-4 rounded-lg text-lg text-gray-700 hover
transition-colors"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <LogoutLink
                      className="block py-2 px-4 rounded-lg text-lg text-red-600 hover
transition-colors"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Logout
                    </LogoutLink>
                  </div>
                ) : (
                  <LoginLink>
                    <Button
                      className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-lg text-white bg-indigo-600 hover
transition-colors"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Get Started
                    </Button>
                  </LoginLink>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
