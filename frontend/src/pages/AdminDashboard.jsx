// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import { COUNTRIES } from "../constants/countries";

const emptyCar = {
  title: "", brand: "", model: "", year: 2023, category: "Sedan", transmission: "Automatic",
  fuelType: "Petrol", seats: 4, pricePerDay: 50, description: "", features: "",
  images: [], country: "Pakistan", city: "", address: "",
};

const TABS = ["Overview", "Cars", "Bookings", "Users"];

const AdminDashboard = () => {
  const [tab, setTab] = useState("Overview");
  const [stats, setStats] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [carForm, setCarForm] = useState(emptyCar);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const loadOverview = async () => setStats((await api.get("/admin/stats")).data);
  const loadCars = async () => setCars((await api.get("/cars", { params: { limit: 100 } })).data.cars);
  const loadBookings = async () => setBookings((await api.get("/bookings")).data);
  const loadUsers = async () => setUsers((await api.get("/admin/users")).data);

  useEffect(() => {
    if (tab === "Overview") loadOverview();
    if (tab === "Cars") loadCars();
    if (tab === "Bookings") loadBookings();
    if (tab === "Users") loadUsers();
  }, [tab]);

  const handleCarChange = (e) => setCarForm({ ...carForm, [e.target.name]: e.target.value });

  // Upload selected photo files to the backend (which forwards them to Cloudinary)
  // and append the returned URLs to carForm.images
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadError("");
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCarForm((f) => ({ ...f, images: [...f.images, ...data.urls] }));
    } catch (err) {
      setUploadError(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = ""; // allow re-selecting the same file
    }
  };

  const removeImage = (url) => {
    setCarForm((f) => ({ ...f, images: f.images.filter((img) => img !== url) }));
  };

  const submitCar = async (e) => {
    e.preventDefault();
    const payload = {
      ...carForm,
      year: Number(carForm.year),
      seats: Number(carForm.seats),
      pricePerDay: Number(carForm.pricePerDay),
      features: carForm.features.split(",").map((f) => f.trim()).filter(Boolean),
      location: { country: carForm.country, city: carForm.city, address: carForm.address },
    };

    if (editingId) {
      await api.put(`/cars/${editingId}`, payload);
    } else {
      await api.post("/cars", payload);
    }

    setCarForm(emptyCar);
    setEditingId(null);
    loadCars();
  };

  const editCar = (car) => {
    setEditingId(car._id);
    setCarForm({
      title: car.title, brand: car.brand, model: car.model, year: car.year,
      category: car.category, transmission: car.transmission, fuelType: car.fuelType,
      seats: car.seats, pricePerDay: car.pricePerDay, description: car.description || "",
      features: (car.features || []).join(", "), images: car.images || [],
      country: car.location?.country || "Pakistan", city: car.location?.city || "", address: car.location?.address || "",
    });
  };

  const deleteCar = async (id) => {
    if (!confirm("Delete this car?")) return;
    await api.delete(`/cars/${id}`);
    loadCars();
  };

  const updateBookingStatus = async (id, status) => {
    await api.put(`/bookings/${id}/status`, { status });
    loadBookings();
  };

  return (
    <div className="container-x py-10">
      <Helmet><title>Admin Dashboard | Hammad Rent Car</title></Helmet>

      <h1 className="font-display text-2xl mb-6">Admin Dashboard</h1>

      <div className="flex gap-2 border-b border-asphalt/10 mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              tab === t ? "border-amber text-asphalt" : "border-transparent text-asphalt/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["Total Users", stats.totalUsers],
            ["Total Cars", stats.totalCars],
            ["Total Bookings", stats.totalBookings],
            ["Total Revenue", `$${stats.totalRevenue}`],
          ].map(([label, value]) => (
            <div key={label} className="card p-4">
              <p className="text-sm text-asphalt/60">{label}</p>
              <p className="font-display text-2xl mt-1">{value}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "Cars" && (
        <div className="grid md:grid-cols-3 gap-8">
          <form onSubmit={submitCar} className="card p-4 space-y-2 md:col-span-1 h-fit">
            <p className="font-semibold text-sm mb-2">{editingId ? "Edit Car" : "Add New Car"}</p>
            <input className="input-field" placeholder="Title (e.g. Toyota Corolla 2023)" name="title" value={carForm.title} onChange={handleCarChange} required />
            <div className="grid grid-cols-2 gap-2">
              <input className="input-field" placeholder="Brand" name="brand" value={carForm.brand} onChange={handleCarChange} required />
              <input className="input-field" placeholder="Model" name="model" value={carForm.model} onChange={handleCarChange} required />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input className="input-field" type="number" placeholder="Year" name="year" value={carForm.year} onChange={handleCarChange} required />
              <input className="input-field" type="number" placeholder="Seats" name="seats" value={carForm.seats} onChange={handleCarChange} required />
            </div>
            <select className="input-field" name="category" value={carForm.category} onChange={handleCarChange}>
              {["Economy", "Sedan", "SUV", "Luxury", "Van", "Hatchback"].map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <select className="input-field" name="transmission" value={carForm.transmission} onChange={handleCarChange}>
                <option>Automatic</option><option>Manual</option>
              </select>
              <select className="input-field" name="fuelType" value={carForm.fuelType} onChange={handleCarChange}>
                <option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
              </select>
            </div>
            <input className="input-field" type="number" placeholder="Price per day ($)" name="pricePerDay" value={carForm.pricePerDay} onChange={handleCarChange} required />
            <select className="input-field" name="country" value={carForm.country} onChange={handleCarChange} required>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input className="input-field" placeholder="City" name="city" value={carForm.city} onChange={handleCarChange} required />
            <input className="input-field" placeholder="Address" name="address" value={carForm.address} onChange={handleCarChange} />
            <input className="input-field" placeholder="Features (comma separated)" name="features" value={carForm.features} onChange={handleCarChange} />

            <div>
              <label className="text-sm font-medium block mb-1">Car Photos</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploading}
                className="text-sm"
              />
              {uploading && <p className="text-xs text-asphalt/60 mt-1">Uploading...</p>}
              {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}

              {carForm.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {carForm.images.map((url) => (
                    <div key={url} className="relative">
                      <img src={url} alt="Car" className="w-16 h-16 object-cover rounded border border-asphalt/20" />
                      <button
                        type="button"
                        onClick={() => removeImage(url)}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 text-xs leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <textarea className="input-field" placeholder="Description" name="description" value={carForm.description} onChange={handleCarChange} />
            <button type="submit" className="btn-primary w-full">{editingId ? "Update Car" : "Add Car"}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setCarForm(emptyCar); }} className="btn-outline w-full">
                Cancel Edit
              </button>
            )}
          </form>

          <div className="md:col-span-2 space-y-3">
            {cars.map((car) => (
              <div key={car._id} className="card p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{car.title}</p>
                  <p className="text-sm text-asphalt/60">${car.pricePerDay}/day · {car.location?.city}</p>
                </div>
                <div className="flex gap-3 text-sm">
                  <button onClick={() => editCar(car)} className="text-teal">Edit</button>
                  <button onClick={() => deleteCar(car._id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Bookings" && (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b._id} className="card p-4 flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <p className="font-medium">{b.car?.title}</p>
                <p className="text-sm text-asphalt/60">{b.user?.name} ({b.user?.email})</p>
                <p className="text-sm text-asphalt/60">
                  {new Date(b.pickupDate).toLocaleDateString()} → {new Date(b.dropoffDate).toLocaleDateString()} · ${b.totalPrice}
                </p>
              </div>
              <select
                className="input-field w-fit"
                value={b.status}
                onChange={(e) => updateBookingStatus(b._id, e.target.value)}
              >
                {["pending", "confirmed", "ongoing", "completed", "cancelled"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {tab === "Users" && (
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u._id} className="card p-3 flex justify-between">
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-asphalt/60">{u.email}</p>
              </div>
              <span className="text-xs uppercase self-center text-asphalt/50">{u.role}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
