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

  useEffect(() => {
    if (user) {
      setProfile({
        given_name: user.given_name || "",
        family_name: user.family_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log("Updated profile:", profile);
    toast.success("Profile updated successfully!");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-2xl leading-6 font-bold text-gray-900">
            Profile Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your personal details and preferences.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-5 mb-8">
              <Image
                src={user.picture || "/default-avatar.png"}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.given_name} {user.family_name}
                </h2>
                <p className="text-sm font-medium text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <h1 htmlFor="given_name">First name</h1>
                  <Input
                    type="text"
                    name="given_name"
                    id="given_name"
                    value={profile.given_name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <h1 htmlFor="family_name">Last name</h1>
                  <Input
                    type="text"
                    name="family_name"
                    id="family_name"
                    value={profile.family_name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <h1 htmlFor="email">Email address</h1>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <h1 htmlFor="phone_number">Phone number</h1>
                  <Input
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    value={profile.phone_number}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
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

export default ProfilePage;
