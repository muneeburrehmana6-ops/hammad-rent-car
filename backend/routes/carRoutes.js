// routes/carRoutes.js
const express = require("express");
const Car = require("../models/Car");
const Booking = require("../models/Booking");
const Notification = require("../models/Notification");
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

const router = express.Router();

// @route   GET /api/cars
// @desc    Get all cars with search & filters
// query params: keyword, city, category, minPrice, maxPrice, transmission, fuelType, seats, page, limit
router.get("/", async (req, res) => {
  try {
    const {
      keyword,
      city,
      country,
      category,
      brand,
      minPrice,
      maxPrice,
      transmission,
      fuelType,
      seats,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { isAvailable: true };

    if (keyword) query.$text = { $search: keyword };
    if (city) query["location.city"] = new RegExp(city, "i");
    if (country) query["location.country"] = country;
    if (category) query.category = category;
    if (brand) query.brand = new RegExp(`^${brand}$`, "i");
    if (transmission) query.transmission = transmission;
    if (fuelType) query.fuelType = fuelType;
    if (seats) query.seats = { $gte: Number(seats) };
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [cars, total] = await Promise.all([
      Car.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Car.countDocuments(query),
    ]);

    // Mark cars that have an active booking covering today as "currently booked"
    const carIds = cars.map((c) => c._id);
    const now = new Date();
    const activeBookings = await Booking.find({
      car: { $in: carIds },
      status: { $in: ["pending", "confirmed", "ongoing"] },
      pickupDate: { $lte: now },
      dropoffDate: { $gte: now },
    }).select("car");
    const bookedCarIds = new Set(activeBookings.map((b) => b.car.toString()));

    const carsWithStatus = cars.map((c) => ({
      ...c.toObject(),
      currentlyBooked: bookedCarIds.has(c._id.toString()),
    }));

    res.json({ cars: carsWithStatus, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/cars/meta/brands
// @desc    Distinct brand names across all available cars (for a brand-based browse page)
router.get("/meta/brands", async (req, res) => {
  try {
    const brands = await Car.distinct("brand", { isAvailable: true });
    res.json(brands.filter(Boolean).sort());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/cars/:id
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cars  (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const car = await Car.create({ ...req.body, createdBy: req.user._id });

    // Create a notification so logged-in users see "new car available"
    await Notification.create({
      type: "new_car",
      message: `New car available: ${car.title} in ${car.location.city}, ${car.location.country}`,
      car: car._id,
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/cars/:id  (Admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/cars/:id  (Admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
