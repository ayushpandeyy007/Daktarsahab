"use client";

import React, { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user } = useKindeBrowserClient();
  const [profile, setProfile] = useState({
    given_name: "",
    family_name: "",
    email: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setProfile({
        given_name: user.given_name || "",
        family_name: user.family_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile:", profile);
    toast.success("Profile updated successfully!");
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-8 sm:px-8">
          <h3 className="text-3xl leading-6 font-bold text-gray-900">
            Profile Information
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            Manage your personal details and preferences.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-6 py-8 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
              <Image
                src={user.picture || "/default-avatar.png"}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full shadow-md"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-900">
                  {user.given_name} {user.family_name}
                </h2>
                <p className="text-lg font-medium text-gray-600 mt-1">
                  {user.email}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                {Object.entries(profile).map(([key, value]) => (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {key
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </label>
                    <Input
                      type={
                        key === "email"
                          ? "email"
                          : key === "phone_number"
                          ? "tel"
                          : "text"
                      }
                      name={key}
                      id={key}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="px-6 py-8 sm:px-8">
        <div className="h-8 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-6 py-8 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse"></div>
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 w-1/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-8">
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfilePage;
