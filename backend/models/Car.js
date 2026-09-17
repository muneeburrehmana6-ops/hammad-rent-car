// models/Car.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // e.g. "Toyota Corolla 2023"
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Economy", "Sedan", "SUV", "Luxury", "Van", "Hatchback", "Convertible"],
      default: "Sedan",
    },
    transmission: { type: String, enum: ["Automatic", "Manual"], default: "Automatic" },
    fuelType: { type: String, enum: ["Petrol", "Diesel", "Hybrid", "Electric"], default: "Petrol" },
    seats: { type: Number, default: 4 },
    doors: { type: Number, default: 4 },
    pricePerDay: { type: Number, required: true },
    images: [{ type: String }],
    description: { type: String, default: "" },
    features: [{ type: String }], // AC, GPS, Bluetooth, etc.

    // Location for pickup / drop-off
    location: {
      country: { type: String, required: true, default: "Pakistan" },
      city: { type: String, required: true },
      address: { type: String, default: "" },
      lat: { type: Number },
      lng: { type: Number },
    },

    isAvailable: { type: Boolean, default: true },
    ratingAverage: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Text index for search
carSchema.index({ title: "text", brand: "text", model: "text", "location.city": "text", "location.country": "text" });

module.exports = mongoose.model("Car", carSchema);
