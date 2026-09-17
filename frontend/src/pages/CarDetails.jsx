// pages/CarDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import ReviewList from "../components/ReviewList";
import { toUSD } from "../constants/currency";

// Contact numbers used for the "Book via WhatsApp" / "Call Now" buttons.
const WHATSAPP_NUMBER = import.meta.env.VITE_ADMIN_WHATSAPP || "923338482430";
const CALL_NUMBER = "923338482430";

// Generates original, car-specific marketing copy + FAQ from the car's own data.
// (No text is copied from any other site — everything is built from templates + the car's fields.)
const buildCarContent = (car) => {
  const name = car.title;
  const city = car.location?.city || "Pakistan";
  const category = car.category?.toLowerCase() || "vehicle";

  return {
    sections: [
      {
        heading: `${name} — Comfort, Reliability, Value`,
        body: `Renting the ${name} from Hammad Motors gives you a dependable ${category} that's ready for city drives, family trips, and business travel alike. With ${car.seats} comfortable seats and ${car.transmission.toLowerCase()} transmission, it's built for an easy, stress-free ride wherever you're headed in ${city}.`,
      },
      {
        heading: "Well-Maintained & Ready To Go",
        body: `Every car in our fleet, including this ${name}, is checked and cleaned before it reaches you. Expect a smooth interior, responsive handling, and a vehicle that's genuinely ready for the road — not just the photos.`,
      },
      {
        heading: "Perfect For Every Occasion",
        body: `Whether it's a wedding, an airport pickup, a weekend trip, or your daily commute, the ${name} adapts to your plans. Just let us know your dates and pickup point, and we'll take care of the rest.`,
      },
      {
        heading: "Available Across Pakistan",
        body: `Hammad Motors and Rent A Car Pakistan serves customers in Gujrat and beyond. Reach out via WhatsApp or a quick call, and we'll confirm availability of the ${name} for your city and dates.`,
      },
    ],
    faqs: [
      {
        q: `Is the ${name} available with a driver?`,
        a: "Yes — most of our rentals can include an experienced driver on request. Just mention it when you message us.",
      },
      {
        q: `What documents do I need to rent the ${name}?`,
        a: "A valid CNIC (or passport for foreign nationals) is usually all that's required. We'll confirm any extra details over WhatsApp or call.",
      },
      {
        q: `Can I rent the ${name} for a wedding or special event?`,
        a: "Absolutely — it's a great choice for weddings, events, and photoshoots. Contact us early to reserve your date.",
      },
      {
        q: `Is the price shown per day fixed?`,
        a: `Yes, Rs ${car.pricePerDay.toLocaleString("en-PK")}/day covers the base rental. Extra days, driver, or long-distance trips can be discussed directly with our team.`,
      },
      {
        q: `How do I confirm my booking?`,
        a: "Tap 'WhatsApp' or 'Call Now' on this page, share your dates and pickup location, and we'll confirm availability right away.",
      },
    ],
  };
};

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");

  const fetchCar = React.useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { data } = await api.get(`/cars/${id}`);
      setCar(data);
    } catch (err) {
      console.error(err);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCar();
  }, [fetchCar]);

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
  if (loadError) {
    return (
      <div className="container-x py-16 text-center">
        <p className="text-asphalt/60 mb-4">Couldn't load this car — the server might still be waking up.</p>
        <button onClick={fetchCar} className="btn-outline !py-2 !px-5">Try Again</button>
      </div>
    );
  }
  if (!car) return <div className="container-x py-10">Car not found.</div>;

  const image = car.images?.[0] || "https://placehold.co/800x500?text=Car+Image";

  return (
    <div className="container-x py-10">
      <Helmet>
        <title>{car.title} | Hammad Motors and Rent A Car Pakistan</title>
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
            ${toUSD(car.pricePerDay)}<span className="text-sm font-body font-normal text-asphalt/60">/day</span>
          </p>
          <p className="text-sm text-asphalt/50 -mt-1">
            Rs {car.pricePerDay.toLocaleString("en-PK")}/day
          </p>

          {/* Technical specifications — Class / Doors / Seats */}
          <p className="font-semibold text-sm mt-6 mb-3">Technical specifications</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="card py-4">
              <p className="text-xl leading-none">🚘</p>
              <p className="text-[10px] text-asphalt/50 mt-1 uppercase tracking-wide">Class</p>
              <p className="text-sm font-medium">{car.category}</p>
            </div>
            <div className="card py-4">
              <p className="text-xl leading-none">🚪</p>
              <p className="text-[10px] text-asphalt/50 mt-1 uppercase tracking-wide">Doors</p>
              <p className="text-sm font-medium">{car.doors || 4}</p>
            </div>
            <div className="card py-4">
              <p className="text-xl leading-none">💺</p>
              <p className="text-[10px] text-asphalt/50 mt-1 uppercase tracking-wide">Seats</p>
              <p className="text-sm font-medium">{car.seats}</p>
            </div>
          </div>

          {/* Book via WhatsApp / Call — direct contact, no online booking form */}
          {car.isAvailable ? (
            <div className="grid grid-cols-2 gap-3 mt-5">
              <a href={`tel:+${CALL_NUMBER}`} className="btn-outline text-center !py-3">
                Call Now
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi! I'd like to book the ${car.title} (Rs ${car.pricePerDay.toLocaleString("en-PK")}/day). Is it available?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center !py-3"
              >
                WhatsApp
              </a>
            </div>
          ) : (
            <button disabled className="btn-primary mt-5 w-full disabled:opacity-50">
              Currently Unavailable
            </button>
          )}

          <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
            <div><span className="text-asphalt/60">Transmission:</span> {car.transmission}</div>
            <div><span className="text-asphalt/60">Fuel:</span> {car.fuelType}</div>
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

      {/* Extended car info — written per-car from its own data, for SEO and customer confidence */}
      <div className="mt-16 max-w-3xl space-y-8">
        {buildCarContent(car).sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-display text-xl mb-2">{s.heading}</h2>
            <p className="text-asphalt/70 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}

        <div>
          <h2 className="font-display text-xl mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {buildCarContent(car).faqs.map((f, i) => (
              <details key={i} className="card p-4 group">
                <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-asphalt/40 group-open:rotate-45 transition-transform">＋</span>
                </summary>
                <p className="text-sm text-asphalt/70 mt-2">{f.a}</p>
              </details>
            ))}
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
