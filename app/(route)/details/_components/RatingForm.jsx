import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";

const RatingForm = ({ doctorId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentDate = new Date().toISOString().split("T")[0];

    const data = {
      data: {
        review,
        rating,
        doctor: doctorId,
        user: "Ayush",
        timeDate: currentDate,
      },
    };

    try {
      await axios.post(
        "https://doctor-appointment-admin-y94n.onrender.com/api/ratings",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error(
        "Error submitting rating:",
        error.response?.data || error.message
      );
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">Thank You!</h2>
        <p className="text-xl text-gray-700">
          Your review is greatly appreciated.
        </p>
        <div className="mt-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={32}
              className={`inline-block mx-1 ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={star <= rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Rate Your Experience
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Review
          </label>
          <textarea
            id="review"
            rows="4"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Your Rating
          </span>
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer transition-colors duration-200 ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                fill={
                  star <= (hoveredRating || rating) ? "currentColor" : "none"
                }
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-200"
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting ? "Submitting..." : "Submit Rating"}
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
