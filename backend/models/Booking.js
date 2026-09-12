// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },

    pickupDate: { type: Date, required: true },
    dropoffDate: { type: Date, required: true },

    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },

    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "ongoing", "completed", "cancelled"],
      default: "pending",
    },

    payment: {
      method: { type: String, enum: ["cash", "card", "stripe"], default: "cash" },
      status: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
      transactionId: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
