import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, User, Calendar } from "lucide-react";

const DoctorReviewsPage = ({ doctorId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [doctorId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://doctor-appointment-admin-y94n.onrender.com/api/ratings?filters[doctor][id][$eq]=${doctorId}&populate=*`
      );
      setReviews(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews. Please try again later.");
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce(
      (acc, review) => acc + review.attributes.rating,
      0
    );
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={`${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={star <= rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  if (loading)
    return <div className="text-center py-10">Loading reviews...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctor Reviews</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Average Rating
            </h2>
            <p className="text-4xl font-bold text-indigo-600">
              {calculateAverageRating()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg text-gray-600">{reviews.length} reviews</p>
            {renderStars(calculateAverageRating())}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center">
                  <User size={20} className="text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.attributes.user}
                  </h3>
                </div>
                <div className="flex items-center mt-1">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600">
                    {new Date(review.attributes.timeDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {renderStars(review.attributes.rating)}
                <span className="ml-2 text-lg font-semibold text-gray-700">
                  {review.attributes.rating}/5
                </span>
              </div>
            </div>
            <p className="text-gray-700 mt-2">{review.attributes.review}</p>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No reviews available for this doctor yet.
        </div>
      )}
    </div>
  );
};

export default DoctorReviewsPage;
