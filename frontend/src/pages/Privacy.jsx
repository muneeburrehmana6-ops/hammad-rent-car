// pages/Privacy.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const Privacy = () => (
  <div>
    <Helmet>
      <title>Privacy Policy | Hammad Motors and Rent A Car Pakistan</title>
      <meta name="description" content="Privacy Policy for Hammad Motors and Rent A Car Pakistan." />
    </Helmet>

    <section className="bg-asphalt text-cream py-16">
      <div className="container-x max-w-3xl">
        <span className="text-amber text-xs font-semibold tracking-widest uppercase">Legal</span>
        <h1 className="font-display text-3xl md:text-4xl mt-2">Privacy Policy</h1>
      </div>
    </section>

    <section className="container-x py-16 max-w-2xl space-y-6 text-asphalt/80 leading-relaxed text-sm">
      <div>
        <p className="font-semibold text-asphalt mb-1">Information We Collect</p>
        <p>When you create an account or make a booking, we collect your name, email, phone number, and booking details (pickup/drop-off dates and locations).</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">How We Use Your Information</p>
        <p>We use your information to process bookings, contact you about your reservation, send booking confirmations, and improve our service. We do not sell your personal information to third parties.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">Data Security</p>
        <p>Your password is securely encrypted, and we take reasonable measures to protect your personal information from unauthorized access.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">Cookies</p>
        <p>Our website may use basic cookies/local storage to keep you logged in and remember your preferences.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">Your Rights</p>
        <p>You can request to update or delete your account information at any time by contacting us directly.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">Contact Us</p>
        <p>For any privacy-related questions, reach out to us at hammad.rent1@gmail.com or 0333-8482430.</p>
      </div>
    </section>
  </div>
);

export default Privacy;
