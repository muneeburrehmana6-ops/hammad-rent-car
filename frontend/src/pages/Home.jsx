// pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import SearchFilters from "../components/SearchFilters";
import CarCard from "../components/CarCard";

// Public domain / royalty-free sample car driving video.
// Swap this URL for your own hosted video any time — just change HERO_VIDEO_URL.
const HERO_VIDEO_URL = "/hero-car.mp4";
const HERO_POSTER = "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1600";

const Home = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/cars", { params: { limit: 150 } });
        setFeaturedCars(data.cars);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleSearch = (filters) => {
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    );
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div>
      <Helmet>
        <title>Hammad Rent Car | Rent a Car Online - Best Prices & Easy Booking</title>
        <meta
          name="description"
          content="Book your next rental car with Hammad Rent Car. Economy to luxury cars, transparent pricing, flexible pickup and drop-off, available across multiple countries."
        />
      </Helmet>

            {/* Hero with background video */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 h-[420px] md:h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={HERO_VIDEO_URL}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Dark gradient overlay for readability + luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-asphalt/90 via-asphalt/80 to-asphalt" />
        </div>

        <div className="relative container-x py-20 md:py-32 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-cream">
            <span className="inline-block text-amber text-xs font-semibold tracking-widest uppercase mb-3">
              Premium Car Rental
            </span>
            <h1 className="font-display text-3xl md:text-5xl leading-tight">
              Drive luxury.<br className="hidden md:block" /> Drive Hammad.
            </h1>
            <p className="mt-4 text-cream/70 max-w-md">
              From everyday economy rides to premium luxury vehicles — book online in minutes,
              with transparent pricing and flexible pickup across multiple countries.
            </p>
            <div className="flex gap-6 mt-8 text-sm">
              <div><span className="font-display text-2xl text-amber">500+</span><p className="text-cream/60">Cars listed</p></div>
              <div><span className="font-display text-2xl text-amber">9</span><p className="text-cream/60">Countries</p></div>
              <div><span className="font-display text-2xl text-amber">24/7</span><p className="text-cream/60">Support</p></div>
            </div>
          </div>

          <div className="bg-cream text-asphalt rounded-xl p-4 md:p-6 shadow-2xl">
            <SearchFilters onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Featured cars pulled straight from the database */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-amber-dark text-xs font-semibold tracking-widest uppercase">Available Now</span>
            <h2 className="font-display text-2xl mt-1">Browse Our Fleet</h2>
          </div>
          <button onClick={() => navigate("/cars")} className="text-sm text-teal font-medium hidden sm:block">
            View all cars →
          </button>
        </div>

        {loading ? (
          <p className="text-asphalt/60">Loading cars...</p>
        ) : featuredCars.length === 0 ? (
          <div className="card p-10 text-center text-asphalt/60">
            No cars listed yet. Once an admin adds cars, they'll appear here automatically.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => <CarCard key={car._id} car={car} />)}
          </div>
        )}
      </section>

      {/* Highlights */}
      <section className="bg-asphalt/5 py-16">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["🚗", "Wide Selection", "Economy to luxury cars"],
            ["💰", "Fair Pricing", "No hidden charges"],
            ["📍", "Flexible Pickup", "Multiple countries & cities"],
            ["🔐", "Secure Booking", "Encrypted & protected"],
          ].map(([icon, title, desc]) => (
            <div key={title}>
              <div className="text-3xl mb-2">{icon}</div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-asphalt/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;