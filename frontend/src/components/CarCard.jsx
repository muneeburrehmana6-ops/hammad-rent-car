// components/CarCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { toUSD } from "../constants/currency";

const CarCard = ({ car }) => {
  const image = car.images?.[0] || "https://placehold.co/600x400?text=Car+Image";
  const isBooked = car.currentlyBooked || car.isAvailable === false;

  return (
    <Link to={`/cars/${car._id}`} className="card overflow-hidden hover:shadow-lg transition-shadow group relative">
      <div className="aspect-[4/3] overflow-hidden bg-asphalt/5 relative">
        <img
          src={image}
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isBooked && (
          <span className="absolute top-2 left-2 bg-asphalt text-cream text-xs font-semibold px-2 py-1 rounded">
            Booked
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-asphalt">{car.title}</h3>
          <div className="text-right shrink-0">
            <p className="font-display text-base leading-none">Rs {car.pricePerDay.toLocaleString("en-PK")}</p>
            <p className="text-[11px] text-asphalt/50">/day · ${toUSD(car.pricePerDay)}</p>
          </div>
        </div>

        {car.ratingCount > 0 && (
          <span className="text-xs text-amber-dark font-medium">
            ★ {car.ratingAverage.toFixed(1)} ({car.ratingCount})
          </span>
        )}

        <p className="text-sm text-asphalt/60 mt-1">{car.location?.city}{car.location?.country ? `, ${car.location.country}` : ""}</p>

        {/* Class / Doors / Seats row — matches reference layout */}
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

        <span className="btn-outline w-full mt-4 !py-2 text-sm block text-center">
          View details
        </span>
      </div>
    </Link>
  );
};

export default CarCard;
