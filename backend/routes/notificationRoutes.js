// routes/notificationRoutes.js
const express = require("express");
const Notification = require("../models/Notification");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/notifications
// @desc    Latest notifications (any logged-in user can see the feed)
router.get("/", protect, async (req, res) => {
  try {
    const notifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("car", "title");
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
