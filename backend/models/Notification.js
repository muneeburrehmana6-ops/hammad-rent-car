// models/Notification.js
// Simple global notification feed (e.g. "new car added"). Frontend tracks
// what the logged-in user has already seen using a timestamp in localStorage,
// so we don't need a per-user read/unread table.
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["new_car"], default: "new_car" },
    message: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
