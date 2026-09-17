// components/CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { toUSD } from "../constants/currency";

const CarCard = ({ car }) => {
  const image = car.images?.[0] || "https://placehold.co/600x400?text=Car+Image";
  const isBooked = car.currentlyBooked || car.isAvailable === false;

  return (
    <Link
      to={`/cars/${car._id}`}
      className="card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative"
    >
      <div className="aspect-[4/3] overflow-hidden bg-asphalt/5 relative">
        <img
          src={image}
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <span className="absolute top-2 left-2 bg-amber text-asphalt text-[11px] font-semibold px-2 py-1 rounded-full">
          {car.category}
        </span>
        {isBooked && (
          <span className="absolute top-2 right-2 bg-asphalt text-cream text-xs font-semibold px-2 py-1 rounded">
            Booked
          </span>
        )}
        {car.ratingCount > 0 && (
          <span className="absolute bottom-2 left-2 bg-white/95 text-amber-dark text-xs font-semibold px-2 py-1 rounded-full">
            ★ {car.ratingAverage.toFixed(1)}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-asphalt leading-snug">{car.title}</h3>
          <div className="text-right shrink-0">
            <p className="font-display text-base leading-none text-asphalt">Rs {car.pricePerDay.toLocaleString("en-PK")}</p>
            <p className="text-[11px] text-asphalt/50">/day · ${toUSD(car.pricePerDay)}</p>
          </div>
        </div>

        <p className="text-sm text-asphalt/60 mt-1 flex items-center gap-1">
          <span>📍</span>
          {car.location?.city}{car.location?.country ? `, ${car.location.country}` : ""}
        </p>

        {/* Class / Doors / Seats row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-asphalt/10 text-center">
          <div>
            <p className="text-lg leading-none">🚘</p>
            <p className="text-[10px] text-asphalt/50 mt-1 uppercase tracking-wide">Class</p>
            <p className="text-xs font-medium">{car.category}</p>
          </div>
          <div>
            <p className="text-lg leading-none">🚪</p>
            <p className="text-[10px] text-asphalt/50 mt-1 uppercase tracking-wide">Doors</p>
            <p className="text-xs font-medium">{car.doors || 4}</p>
          </div>
          <div>
            <p className="text-lg leading-none">💺</p>
            <p className="text-[10px] text-asphalt/50 mt-1 uppercase tracking-wide">Seats</p>
            <p className="text-xs font-medium">{car.seats}</p>
          </div>
        </div>

        <span className="btn-primary w-full mt-4 !py-2 text-sm block text-center">
          View Details
        </span>
      </div>
    </Link>
  );
};

export default CarCard;
