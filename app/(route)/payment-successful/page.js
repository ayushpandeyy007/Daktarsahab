"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const SuccessfulPayment = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processPayment = async () => {
      await simulatePaymentProcessing();
      handleBookingData();
      await finishProcessing();
    };

    processPayment();
  }, [router]);

  const simulatePaymentProcessing = () => {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const handleBookingData = () => {
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));
    if (bookingData) {
      localStorage.setItem("pendingBookingData", JSON.stringify(bookingData));
      localStorage.removeItem("bookingData");
    }
  };

  const finishProcessing = async () => {
    setIsProcessing(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/payment-success");
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-400 to-teal-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <PaymentProcessingUI isProcessing={isProcessing} />
    </div>
  );
};

const PaymentProcessingUI = ({ isProcessing }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl text-center"
  >
    <StatusText isProcessing={isProcessing} />
    <ProgressBar />
  </motion.div>
);


const StatusText = ({ isProcessing }) => (
  <>
    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
      {isProcessing ? "Processing Payment" : "Payment Successful"}
    </h2>
    <p className="mt-2 text-lg text-gray-600">
      {isProcessing
        ? "Please wait while we process your payment..."
        : "Redirecting you to the confirmation page..."}
    </p>
  </>
);

const ProgressBar = () => (
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    transition={{ duration: 3 }}
    className="h-2 bg-blue-500 rounded-full"
  />
);

export default SuccessfulPayment;
