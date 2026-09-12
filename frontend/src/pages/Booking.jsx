// pages/Booking.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Booking = () => {
  const { carId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [form, setForm] = useState({
    pickupDate: "",
    dropoffDate: "",
    pickupLocation: "",
    dropoffLocation: "",
    paymentMethod: "cash",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchCar = async () => {
      const { data } = await api.get(`/cars/${carId}`);
      setCar(data);
      setForm((f) => ({ ...f, pickupLocation: data.location?.city, dropoffLocation: data.location?.city }));
    };
    fetchCar();
  }, [carId, user, navigate]);

  const totalDays =
    form.pickupDate && form.dropoffDate
      ? Math.max(1, Math.ceil((new Date(form.dropoffDate) - new Date(form.pickupDate)) / 86400000))
      : 0;
  const totalPrice = car ? totalDays * car.pricePerDay : 0;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/bookings", {
        car: carId,
        pickupDate: form.pickupDate,
        dropoffDate: form.dropoffDate,
        pickupLocation: form.pickupLocation,
        dropoffLocation: form.dropoffLocation,
        payment: { method: form.paymentMethod },
      });
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!car) return <div className="container-x py-10">Loading...</div>;

  return (
    <div className="container-x py-10 max-w-xl">
      <Helmet>
        <title>Book {car.title} | Hammad Rent Car</title>
      </Helmet>

      <h1 className="font-display text-2xl mb-6">Book {car.title}</h1>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Pickup Date</label>
            <input
              type="date"
              name="pickupDate"
              required
              className="input-field mt-1"
              value={form.pickupDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Drop-off Date</label>
            <input
              type="date"
              name="dropoffDate"
              required
              className="input-field mt-1"
              value={form.dropoffDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Pickup Location</label>
          <input
            name="pickupLocation"
            required
            className="input-field mt-1"
            value={form.pickupLocation}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Drop-off Location</label>
          <input
            name="dropoffLocation"
            required
            className="input-field mt-1"
            value={form.dropoffLocation}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Payment Method</label>
          <select name="paymentMethod" className="input-field mt-1" value={form.paymentMethod} onChange={handleChange}>
            <option value="cash">Cash on Pickup</option>
            <option value="card">Card (pay at office)</option>
            <option value="stripe">Pay Online (Stripe)</option>
          </select>
        </div>

        <div className="border-t border-asphalt/10 pt-4 flex justify-between font-semibold">
          <span>Total ({totalDays} day{totalDays !== 1 ? "s" : ""})</span>
          <span>${totalPrice}</span>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
