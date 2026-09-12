// routes/bookingRoutes.js
const express = require("express");
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
router.post("/", protect, async (req, res) => {
  try {
    const { car: carId, pickupDate, dropoffDate, pickupLocation, dropoffLocation, payment } = req.body;

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (!car.isAvailable) return res.status(400).json({ message: "Car is not available" });

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const totalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const totalPrice = totalDays * car.pricePerDay;

    // Prevent overlapping bookings for the same car
    const overlap = await Booking.findOne({
      car: carId,
      status: { $in: ["pending", "confirmed", "ongoing"] },
      pickupDate: { $lt: end },
      dropoffDate: { $gt: start },
    });
    if (overlap) return res.status(400).json({ message: "Car is already booked for these dates" });

    const booking = await Booking.create({
      user: req.user._id,
      car: carId,
      pickupDate: start,
      dropoffDate: end,
      pickupLocation,
      dropoffLocation,
      totalDays,
      totalPrice,
      payment: payment || { method: "cash" },
    });

    res.status(201).json(booking);

    // Notify admin by email (fire-and-forget, doesn't block the response)
    if (process.env.ADMIN_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Booking: ${car.title}`,
        html: `
          <h2>New Booking Received</h2>
          <p><strong>Car:</strong> ${car.title}</p>
          <p><strong>Customer:</strong> ${req.user.name} (${req.user.email}${req.user.phone ? ", " + req.user.phone : ""})</p>
          <p><strong>Pickup:</strong> ${start.toDateString()} at ${pickupLocation}</p>
          <p><strong>Drop-off:</strong> ${end.toDateString()} at ${dropoffLocation}</p>
          <p><strong>Total:</strong> $${totalPrice} (${totalDays} day(s))</p>
          <p><strong>Payment method:</strong> ${payment?.method || "cash"}</p>
        `,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/bookings/my
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/bookings  (Admin - all bookings)
router.get("/", protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("car")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id/status  (Admin - update booking status)
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/bookings/:id/cancel  (User cancels own booking)
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
