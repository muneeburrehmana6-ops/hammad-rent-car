// pages/Profile.jsx - user's bookings
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  ongoing: "bg-teal/10 text-teal",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const Profile = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await api.get("/bookings/my");
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    await api.put(`/bookings/${id}/cancel`);
    fetchBookings();
  };

  return (
    <div className="container-x py-10">
      <Helmet><title>My Bookings | Hammad Rent Car</title></Helmet>

      <h1 className="font-display text-2xl mb-2">My Bookings</h1>
      <p className="text-asphalt/60 mb-6">Welcome back, {user?.name}</p>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-asphalt/60">You haven't made any bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="card p-4 flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="font-semibold">{b.car?.title}</p>
                <p className="text-sm text-asphalt/60">
                  {new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.dropoffDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-asphalt/60">
                  {b.pickupLocation} → {b.dropoffLocation}
                </p>
                <p className="text-sm mt-1">${b.totalPrice} total · {b.payment?.method}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[b.status]}`}>
                  {b.status}
                </span>
                {["pending", "confirmed"].includes(b.status) && (
                  <button onClick={() => cancelBooking(b._id)} className="text-xs text-red-600 hover:underline">
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
