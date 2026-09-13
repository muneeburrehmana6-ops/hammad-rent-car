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
          {car.ratingCount > 0 && (
            <span className="text-xs text-amber-dark font-medium whitespace-nowrap">
              ★ {car.ratingAverage.toFixed(1)} ({car.ratingCount})
            </span>
          )}
        </div>
        <p className="text-sm text-asphalt/60 mt-1">
          {car.category} · {car.transmission} · {car.seats} seats
        </p>
        <p className="text-sm text-asphalt/60">{car.location?.city}{car.location?.country ? `, ${car.location.country}` : ""}</p>
               <div className="mt-3 flex items-center justify-between">
                    <div>
            <p className="font-display text-lg">
              ${toUSD(car.pricePerDay)}
              <span className="text-xs font-body font-normal text-asphalt/60">/day</span>
            </p>
            <p className="text-xs text-asphalt/50">
              Rs {car.pricePerDay.toLocaleString("en-PK")}/day
            </p>
          </div>
          <span className="text-xs text-teal font-medium">View details →</span>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
