import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-16 lg:py-20 gap-12">
          <div className="max-w-xl space-y-8 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Find & Book
              <span className="block text-indigo-600">Your Appointment</span>
            </h1>
            <p className="text-xl text-gray-600 md:pr-8">
              Discover top-rated doctors, book appointments with ease, and take
              control of your health journey. Your well-being is just a click
              away.
            </p>
            <Button
              size="lg"
              className="font-semibold text-lg px-8 py-4 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            >
              Explore Now
            </Button>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-w-4 aspect-h-3">
              <Image
                src="/hero-image.jpg" // Replace with your actual image path
                alt="Doctor consultation"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl transform rotate-12 shadow-lg">
              Book Now!
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-yellow-300 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-indigo-300 rounded-full opacity-20"></div>
    </div>
  );
}

export default Hero;
