// routes/adminRoutes.js
// Dashboard summary stats for the admin panel
const express = require("express");
const User = require("../models/User");
const Car = require("../models/Car");
const Booking = require("../models/Booking");
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

const router = express.Router();

router.get("/stats", protect, admin, async (req, res) => {
  try {
    const [totalUsers, totalCars, totalBookings, revenueAgg] = await Promise.all([
      User.countDocuments(),
      Car.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        { $match: { "payment.status": "paid" } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
    ]);

    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json({
      totalUsers,
      totalCars,
      totalBookings,
      totalRevenue: revenueAgg[0]?.total || 0,
      bookingsByStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List all users (admin)
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
