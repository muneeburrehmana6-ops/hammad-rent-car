// pages/CarDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import ReviewList from "../components/ReviewList";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      const { data } = await api.get(`/cars/${id}`);
      setCar(data);
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!user) return navigate("/login");
    try {
      await api.post("/reviews", { car: id, ...reviewForm });
      setReviewForm({ rating: 5, comment: "" });
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit review");
    }
  };

  if (loading) return <div className="container-x py-10">Loading...</div>;
  if (!car) return <div className="container-x py-10">Car not found.</div>;

  const image = car.images?.[0] || "https://placehold.co/800x500?text=Car+Image";

  return (
    <div className="container-x py-10">
      <Helmet>
        <title>{car.title} | Hammad Rent Car</title>
        <meta name="description" content={`Rent ${car.title} in ${car.location?.city}. ${car.description}`} />
      </Helmet>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img src={image} alt={car.title} className="w-full rounded-lg object-cover aspect-[4/3]" />
        </div>

        <div>
          <h1 className="font-display text-2xl">{car.title}</h1>
          <p className="text-asphalt/60 mt-1">{car.location?.city}, {car.location?.country} · {car.category}</p>

          {car.ratingCount > 0 && (
            <p className="text-amber-dark mt-2">★ {car.ratingAverage.toFixed(1)} ({car.ratingCount} reviews)</p>
          )}

          <p className="font-display text-3xl mt-4">
            ${car.pricePerDay}<span className="text-sm font-body font-normal text-asphalt/60">/day</span>
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
            <div><span className="text-asphalt/60">Transmission:</span> {car.transmission}</div>
            <div><span className="text-asphalt/60">Fuel:</span> {car.fuelType}</div>
            <div><span className="text-asphalt/60">Seats:</span> {car.seats}</div>
            <div><span className="text-asphalt/60">Year:</span> {car.year}</div>
          </div>

          {car.features?.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-sm mb-2">Features</p>
              <div className="flex flex-wrap gap-2">
                {car.features.map((f) => (
                  <span key={f} className="text-xs bg-asphalt/5 px-2 py-1 rounded">{f}</span>
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 text-asphalt/80 text-sm">{car.description}</p>

          <button
            onClick={() => navigate(`/booking/${car._id}`)}
            disabled={!car.isAvailable}
            className="btn-primary mt-6 w-full disabled:opacity-50"
          >
            {car.isAvailable ? "Book This Car" : "Currently Unavailable"}
          </button>

          {/* Pickup location map */}
          <div className="mt-6">
            <p className="font-semibold text-sm mb-2">Pickup Location</p>
            <div className="rounded-lg overflow-hidden border border-asphalt/10 aspect-video">
              <iframe
                title="Pickup location map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  car.location?.address || `${car.location?.city}, ${car.location?.country}`
                )}&output=embed`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16 max-w-2xl">
        <h2 className="font-display text-xl mb-4">Reviews</h2>
        <ReviewList carId={id} refreshKey={refreshKey} />

        <form onSubmit={handleReviewSubmit} className="card p-4 mt-6 space-y-3">
          <p className="font-semibold text-sm">Leave a review</p>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <select
            className="input-field"
            value={reviewForm.rating}
            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
          </select>
          <textarea
            className="input-field"
            placeholder="Share your experience..."
            rows={3}
            value={reviewForm.comment}
            onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
          />
          <button type="submit" className="btn-outline">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
