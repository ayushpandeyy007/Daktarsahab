"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const SuccessfulPayment = () => {
  const router = useRouter();

  const handleViewDoctors = () => {
    router.push("/");
  };

  return (
    <div className="h-[900px] bg-gradient-to-r from-blue-400 to-teal-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
            <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-3xl font-extrabold text-gray-900"
          >
            Thank You!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-lg text-gray-600"
          >
            Your appointment has been successfully booked.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-6"
        >
          <div className="rounded-md bg-blue-50 p-4">
            <p className="text-md text-blue-700 text-center">
              A confirmation email with your booking details has been sent to
              your email address.
            </p>
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewDoctors}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaHome className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessfulPayment;
