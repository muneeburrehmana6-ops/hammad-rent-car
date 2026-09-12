// utils/sendEmail.js
// Sends notification emails via Gmail SMTP using Nodemailer.
// Requires EMAIL_USER + EMAIL_PASS (a Gmail "App Password") in .env.
// If not configured, this silently does nothing instead of crashing the app.

const nodemailer = require("nodemailer");

let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

const sendEmail = async ({ to, subject, html }) => {
  if (!transporter) {
    console.log("Email not configured (EMAIL_USER/EMAIL_PASS missing) - skipping email:", subject);
    return;
  }
  try {
    await transporter.sendMail({
      from: `"Hammad Rent Car" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Failed to send email:", error.message);
  }
};

module.exports = sendEmail;
