// routes/uploadRoutes.js
// Handles image uploads (e.g. car photos) to Cloudinary.
// Requires CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env

const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

const router = express.Router();

// Keep uploaded file in memory, then stream it to Cloudinary (no disk writes needed)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per image
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

const streamUpload = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "hammad-rent-car/cars" },
      (error, result) => (result ? resolve(result) : reject(error))
    );
    stream.end(buffer);
  });

// @route   POST /api/upload  (Admin only)
// @desc    Upload one or more images, returns their Cloudinary URLs
// form-data field name: "images" (can select multiple files)
router.post("/", protect, admin, upload.array("images", 6), async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(400).json({ message: "Image upload is not configured on this server" });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const results = await Promise.all(req.files.map((f) => streamUpload(f.buffer)));
    const urls = results.map((r) => r.secure_url);

    res.json({ urls });
  } catch (error) {
    res.status(500).json({ message: error.message || "Upload failed" });
  }
});

module.exports = router;
