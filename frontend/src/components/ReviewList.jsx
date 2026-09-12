// components/ReviewList.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Stars = ({ rating }) => (
  <span className="text-amber-dark">
    {"★".repeat(Math.round(rating))}
    <span className="text-asphalt/20">{"★".repeat(5 - Math.round(rating))}</span>
  </span>
);

const ReviewList = ({ carId, refreshKey }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data } = await api.get(`/reviews/car/${carId}`);
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, [carId, refreshKey]);

  if (loading) return <p className="text-sm text-asphalt/60">Loading reviews...</p>;
  if (!reviews.length) return <p className="text-sm text-asphalt/60">No reviews yet. Be the first!</p>;

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r._id} className="card p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">{r.user?.name || "Anonymous"}</p>
            <Stars rating={r.rating} />
          </div>
          {r.comment && <p className="text-sm text-asphalt/70 mt-2">{r.comment}</p>}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
