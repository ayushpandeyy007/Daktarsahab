import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleExplore = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/explore";
    }
  };
  const handleLearnmore = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/about";
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-16 lg:py-24 gap-12">
          <div className="max-w-xl space-y-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Find & Book
              <span className="block text-indigo-600 mt-2">
                Your Appointment
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 md:pr-8 leading-relaxed">
              Discover top-rated doctors, book appointments with ease, and take
              control of your health journey. Your well-being is just a click
              away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                onClick={handleExplore}
                size="lg"
                className="font-semibold text-lg px-8 py-4 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Now
              </Button>
              <Button
                onClick={handleLearnmore}
                size="lg"
                variant="outline"
                className="font-semibold text-lg px-8 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-w-4 aspect-h-3 md:aspect-w-3 md:aspect-h-4">
              <Image
                src="/hero-image.jpg" // Replace with your actual image path
                alt="Doctor consultation"
                layout="fill"
                objectFit="cover"
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl transform rotate-12 shadow-lg">
              <span className="transform -rotate-12">Book Now!</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-48 h-48 bg-yellow-300 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-72 h-72 bg-indigo-300 rounded-full opacity-20"></div>
    </div>
  );
}

export default Hero;
