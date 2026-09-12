// routes/reviewRoutes.js
const express = require("express");
const Review = require("../models/Review");
const Car = require("../models/Car");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Helper: recalculate a car's average rating
async function recalcCarRating(carId) {
  const reviews = await Review.find({ car: carId });
  const ratingCount = reviews.length;
  const ratingAverage = ratingCount
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / ratingCount
    : 0;
  await Car.findByIdAndUpdate(carId, { ratingAverage, ratingCount });
}

// @route   GET /api/reviews/car/:carId
router.get("/car/:carId", async (req, res) => {
  try {
    const reviews = await Review.find({ car: req.params.carId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/reviews
router.post("/", protect, async (req, res) => {
  try {
    const { car, rating, comment, booking } = req.body;

    const review = await Review.create({
      user: req.user._id,
      car,
      rating,
      comment,
      booking,
    });

    await recalcCarRating(car);
    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already reviewed this car" });
    }
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/reviews/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.deleteOne();
    await recalcCarRating(review.car);
    res.json({ message: "Review removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
