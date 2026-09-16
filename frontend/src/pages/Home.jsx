// pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import CarCard from "../components/CarCard";
import Reveal from "../components/Reveal";

// Public domain / royalty-free sample car driving video.
// Swap this URL for your own hosted video any time — just change HERO_VIDEO_URL.
const HERO_VIDEO_URL = "/hero-car.mp4";
const HERO_POSTER = "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1600";

// Rotating hero headlines — cycles automatically every few seconds.
const HERO_SLIDES = [
  {
    tag: "WHEELS WHEN YOU NEED",
    heading: "All luxury cars are available with driver in all cities of Pakistan.",
    showCta: true,
  },
  {
    tag: "GUJRAT, PAKISTAN",
    heading: "Car rental company in Gujrat, Pakistan.",
    showCta: true,
  },
];

const STEPS = [
  {
    icon: "📍",
    title: "Date & Location",
    desc: "Pick the location and the needed rent date.",
    more: "Choose your pickup city and the exact dates you need the car — we serve every major city across Pakistan.",
  },
  {
    icon: "🚘",
    title: "Choose A Car",
    desc: "Select the vehicle using our fleet.",
    more: "Browse economy, SUV, and luxury vehicles — each listing shows real photos, seats, and transparent pricing in PKR & USD.",
  },
  {
    icon: "📋",
    title: "Make A Booking",
    desc: "Enter your details and confirm.",
    more: "Fill in your pickup/drop-off details and confirm — you'll get a booking confirmation and our team will reach out to finalize.",
  },
  {
    icon: "🏁",
    title: "Enjoy Your Ride!",
    desc: "Sit back and enjoy the journey.",
    more: "Your driver (if selected) and car will be ready at the agreed time and place — just relax and enjoy the ride.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [openStep, setOpenStep] = useState(null);

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

  // Rotate the hero headline every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[slideIndex];

  return (
    <div>
      <Helmet>
        <title>Hammad Motors and Rent A Car Pakistan | Luxury Cars With Driver</title>
        <meta
          name="description"
          content="Hammad Motors and Rent A Car Pakistan — based in Gujrat, serving all cities of Pakistan. Luxury cars available with driver, transparent pricing, easy online booking."
        />
      </Helmet>

      {/* Hero with background video */}
      <section className="relative overflow-hidden bg-asphalt">
        <div className="absolute inset-0 h-[520px] md:h-full">
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

        <div className="relative container-x py-16 md:py-28">
          <div className="text-cream max-w-2xl">
            <img src="/logo.png" alt="Hammad Motors logo" className="h-14 md:h-16 mb-5 object-contain" />

            <div key={slideIndex} className="animate-fadeInUp">
              <span className="inline-block text-amber text-xs font-semibold tracking-widest uppercase mb-3">
                {slide.tag}
              </span>
              <h1 className="font-display text-2xl md:text-4xl leading-tight">
                {slide.heading}
              </h1>
              {slide.showCta && (
                <button
                  onClick={() => navigate("/cars")}
                  className="btn-primary mt-5 !py-2.5 !px-6"
                >
                  Book Now
                </button>
              )}
            </div>

            <p className="mt-5 text-cream/70 max-w-md flex items-center gap-2">
              <span className="text-amber">★★★★★</span>
              <span>4.9/5 — trusted by 500+ happy customers across Pakistan</span>
            </p>

            <div className="flex gap-6 mt-8 text-sm">
              <div><span className="font-display text-2xl text-amber">500+</span><p className="text-cream/60">Cars listed</p></div>
              <div><span className="font-display text-2xl text-amber">9</span><p className="text-cream/60">Cities</p></div>
              <div><span className="font-display text-2xl text-amber">24/7</span><p className="text-cream/60">Support</p></div>
            </div>

            <button
              onClick={() => navigate("/cars")}
              className="btn-primary mt-8 !py-3 !px-7"
            >
              Search Cars
            </button>
          </div>
        </div>
      </section>

      {/* SEO / intro content section */}
      <Reveal as="section" className="container-x py-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-amber-dark text-xs font-semibold tracking-widest uppercase">Rent A Car Anywhere In Pakistan</span>
          <h2 className="font-display text-2xl md:text-3xl mt-2 mb-4">
            Rent A Car In All Cities Of Pakistan
          </h2>
          <p className="text-asphalt/70 leading-relaxed">
            Hammad Motors and Rent A Car Pakistan is based in Gujrat and proudly serves customers
            across every major city in Pakistan. Whether you need a compact car for everyday city
            driving, a spacious SUV for a family trip, or a luxury vehicle with a professional driver
            for a special occasion, our fleet has the right car for you. With transparent pricing,
            flexible pickup and drop-off, and a team that's available around the clock, renting a car
            has never been this easy. Book online in minutes and drive with confidence, anywhere in Pakistan.
          </p>
        </div>
      </Reveal>

      {/* How it works — 4 steps */}
      <Reveal as="section" className="bg-asphalt/5 py-16">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-teal text-xs font-semibold tracking-widest uppercase">How To Rent</span>
            <h2 className="font-display text-2xl md:text-3xl mt-2">Make 4 Simple Steps To Rent a Car!</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => {
              const isOpen = openStep === i;
              return (
                <button
                  key={step.title}
                  onClick={() => setOpenStep(isOpen ? null : i)}
                  className="card p-5 text-left hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-amber text-asphalt font-bold flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <p className="font-semibold text-asphalt">{step.title}</p>
                  <p className="text-sm text-asphalt/60 mt-1">{step.desc}</p>
                  {isOpen && (
                    <p className="text-sm text-asphalt/70 mt-3 pt-3 border-t border-asphalt/10">
                      {step.more}
                    </p>
                  )}
                  <span className="text-xs text-teal font-medium mt-3 inline-block">
                    {isOpen ? "Show less ↑" : "Tap for details →"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Featured cars pulled straight from the database */}
      <Reveal as="section" className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-amber-dark text-xs font-semibold tracking-widest uppercase">Available Now</span>
            <h2 className="font-display text-2xl mt-1">See Our Fleet</h2>
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
            {featuredCars.map((car, i) => (
              <Reveal key={car._id} delay={i * 60}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </div>
        )}
      </Reveal>

      {/* Highlights */}
      <Reveal as="section" className="bg-asphalt/5 py-16">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["🚗", "Wide Selection", "Economy to luxury cars", "/cars"],
            ["💰", "Fair Pricing", "No hidden charges", "/faqs"],
            ["📍", "Flexible Pickup", "All cities of Pakistan", "/contact"],
            ["🔐", "Secure Booking", "Encrypted & protected", "/privacy"],
          ].map(([icon, title, desc, link]) => (
            <Link key={title} to={link} className="block hover:-translate-y-1 transition-transform">
              <div className="text-3xl mb-2">{icon}</div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-asphalt/60">{desc}</p>
              <span className="text-xs text-teal font-medium mt-1 inline-block">Learn more →</span>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

export default Home;
