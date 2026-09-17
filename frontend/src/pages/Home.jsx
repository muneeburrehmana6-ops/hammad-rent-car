// pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import CarCard from "../components/CarCard";
import Reveal from "../components/Reveal";

const PHONE_TEL = "+923338482430";

// Same inline SVG car-silhouette mark used in the Navbar/Footer.
const LogoMark = () => (
  <svg viewBox="0 0 48 24" className="h-8 w-16" fill="none">
    <path
      d="M2 15c3-6 8-10 14-10h10c5 0 9 3 12 7l6 1"
      stroke="#E8A33D"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 16h38c1 0 2-1 2-2v-1c0-1-1-2-2-2l-4-1c-2-3-5-5-9-5H16c-4 0-8 3-10 7l-2 2v2z"
      fill="#F3F1EC"
    />
    <circle cx="12" cy="17" r="2.5" fill="#14181C" />
    <circle cx="36" cy="17" r="2.5" fill="#14181C" />
  </svg>
);

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

// Category filter bar shown above the fleet — maps to the Car model's `category` field.
const FLEET_CATEGORIES = [
  { label: "All Cars", values: [] },
  { label: "Budget Cars", values: ["Economy", "Hatchback"] },
  { label: "Standard Car", values: ["Sedan"] },
  { label: "Luxury Cars", values: ["Luxury"] },
  { label: "Van", values: ["Van"] },
  { label: "Convertible Cars", values: ["Convertible"] },
];

const STEPS = [
  {
    icon: "🚘",
    title: "Browse Our Fleet",
    desc: "Pick a category or search for the car you need.",
    more: "Explore economy, sedan, SUV, luxury, van and convertible cars — every listing shows real photos, seats, doors and transparent pricing in PKR & USD.",
  },
  {
    icon: "📋",
    title: "Check Car Details",
    desc: "View class, doors, seats & price per day.",
    more: "Open any car's details page to see its specifications, features, and pickup location before you decide.",
  },
  {
    icon: "💬",
    title: "Contact Us",
    desc: "Tap Call Now or WhatsApp to confirm.",
    more: "Message us on WhatsApp or call directly from the car's page — we'll confirm availability, dates and pickup details with you personally.",
  },
  {
    icon: "🏁",
    title: "Enjoy Your Ride!",
    desc: "Sit back and enjoy the journey.",
    more: "Your car (and driver, if requested) will be ready at the agreed time and place — just relax and enjoy the ride.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const videoRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [openStep, setOpenStep] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const fetchFeatured = React.useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { data } = await api.get("/cars", { params: { limit: 30 } });
      setFeaturedCars(data.cars);
    } catch (err) {
      console.error(err);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

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

  const activeValues = FLEET_CATEGORIES[activeCategory].values;
  const visibleCars = activeValues.length
    ? featuredCars.filter((c) => activeValues.includes(c.category))
    : featuredCars;

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
            preload="auto"
          />
          {/* Dark gradient overlay for readability + luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-asphalt/90 via-asphalt/80 to-asphalt" />
        </div>

        <div className="relative container-x py-16 md:py-28">
          <div className="text-cream max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center justify-center gap-2 font-display text-2xl md:text-3xl text-amber mb-5">
              <LogoMark />
              HAMMAD MOTORS
            </span>

            <div key={slideIndex} className="animate-fadeInUp">
              <span className="inline-block text-amber text-xs font-semibold tracking-widest uppercase mb-3">
                {slide.tag}
              </span>
              <h1 className="font-display text-2xl md:text-4xl leading-tight">
                {slide.heading}
              </h1>
              {slide.showCta && (
                <div className="flex flex-wrap justify-center gap-3 mt-5">
                  <button
                    onClick={() => navigate("/cars")}
                    className="btn-primary !py-2.5 !px-6"
                  >
                    Book Now
                  </button>
                  <a href={`tel:${PHONE_TEL}`} className="btn-outline !py-2.5 !px-6 !border-cream/30 !text-cream hover:!bg-cream/10">
                    Call Now
                  </a>
                </div>
              )}
            </div>

            <p className="mt-5 text-cream/70 max-w-md mx-auto flex items-center justify-center gap-2">
              <span className="text-amber">★★★★★</span>
              <span>4.9/5 — trusted by 500+ happy customers across Pakistan</span>
            </p>

            <div className="flex justify-center gap-6 mt-8 text-sm">
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

      {/* Category filter navbar — click a category to filter the fleet below */}
      <div className="bg-white border-y border-asphalt/10 sticky top-16 z-40">
        <div className="container-x flex flex-wrap gap-1 py-2">
          {FLEET_CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
                activeCategory === i
                  ? "bg-asphalt text-cream"
                  : "text-asphalt/70 hover:bg-asphalt/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-asphalt/10" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-asphalt/10 rounded w-3/4" />
                  <div className="h-3 bg-asphalt/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : loadError ? (
          <div className="card p-10 text-center text-asphalt/60">
            <p>Couldn't load cars right now — the server might still be waking up.</p>
            <button onClick={fetchFeatured} className="btn-outline mt-4 !py-2 !px-5">
              Try Again
            </button>
          </div>
        ) : visibleCars.length === 0 ? (
          <div className="card p-10 text-center text-asphalt/60">
            {featuredCars.length === 0
              ? "No cars listed yet. Once an admin adds cars, they'll appear here automatically."
              : "No cars in this category yet — try another category above."}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCars.map((car, i) => (
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

      {/* Don't Dream It, Drive It — CTA with accepted payment methods */}
      <Reveal as="section" className="bg-asphalt text-cream py-16">
        <div className="container-x grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              DON'T DREAM IT,<br />
              <span className="text-amber">DRIVE IT!</span>
            </h2>
            <p className="mt-5 text-cream/70 max-w-md">
              Hammad Motors and Rent A Car Pakistan offers the best way to explore Pakistan.
              Our fleet includes Toyota Land Cruiser, Toyota Revo, Toyota Corolla, Honda Civic,
              Honda BRV, Audi, Lexus, Range Rover, Rolls-Royce, and more — every car ready to
              give you a smooth, comfortable ride, whatever your budget or occasion.
            </p>
            <button onClick={() => navigate("/cars")} className="btn-primary mt-6 !py-3 !px-7">
              Browse Fleet
            </button>

            <div className="mt-10">
              <p className="text-xs font-semibold tracking-widest uppercase text-cream/50 mb-3">We Accept</p>
              <div className="flex flex-wrap gap-3">
                {["Cash", "JazzCash", "EasyPaisa", "Bank Transfer"].map((method) => (
                  <span
                    key={method}
                    className="text-xs font-semibold px-3 py-2 rounded-md bg-cream/10 border border-cream/20"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-amber/20 rounded-full blur-3xl" />
            <img
              src="https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Luxury rental car"
              className="relative rounded-xl w-full h-72 md:h-96 object-cover shadow-2xl"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Home;
