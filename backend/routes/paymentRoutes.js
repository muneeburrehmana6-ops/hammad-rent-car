// routes/paymentRoutes.js
// Optional Stripe payment integration.
// Requires STRIPE_SECRET_KEY in .env — leave unset to keep "cash on pickup" only.
const express = require("express");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/create-payment-intent", protect, async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(400).json({ message: "Stripe is not configured on this server" });
    }
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const { amount, currency = "usd" } = req.body; // amount in smallest currency unit (e.g. cents)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { userId: req.user._id.toString() },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
