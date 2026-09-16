// pages/Terms.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const Terms = () => (
  <div>
    <Helmet>
      <title>Terms &amp; Conditions | Hammad Motors and Rent A Car Pakistan</title>
      <meta name="description" content="Terms and Conditions for renting a car with Hammad Motors and Rent A Car Pakistan." />
    </Helmet>

    <section className="bg-asphalt text-cream py-16">
      <div className="container-x max-w-3xl">
        <span className="text-amber text-xs font-semibold tracking-widest uppercase">Legal</span>
        <h1 className="font-display text-3xl md:text-4xl mt-2">Terms &amp; Conditions</h1>
      </div>
    </section>

    <section className="container-x py-16 max-w-2xl space-y-6 text-asphalt/80 leading-relaxed text-sm">
      <div>
        <p className="font-semibold text-asphalt mb-1">1. Booking &amp; Confirmation</p>
        <p>A booking is confirmed once you complete the reservation on our website or through our team. Availability is subject to fleet and location.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">2. Eligibility &amp; Documents</p>
        <p>Renters must provide a valid CNIC. If self-driving, a valid driving license is also required. All information provided must be accurate.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">3. Payment</p>
        <p>Full or partial payment may be required at the time of booking or pickup, depending on the vehicle and rental duration, via cash, card, or mobile wallet transfer.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">4. Vehicle Use</p>
        <p>Vehicles must be used responsibly and only for lawful purposes. The renter is responsible for any traffic violations, fines, or damage incurred during the rental period.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">5. Cancellations</p>
        <p>Bookings may be cancelled or rescheduled subject to availability. Please contact us as early as possible for any changes to your booking.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">6. Liability</p>
        <p>Hammad Motors and Rent A Car Pakistan is not liable for indirect losses arising from delays, vehicle unavailability due to circumstances beyond our control, or misuse of the vehicle by the renter.</p>
      </div>
      <div>
        <p className="font-semibold text-asphalt mb-1">7. Changes to These Terms</p>
        <p>We may update these terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.</p>
      </div>
      <p className="text-xs text-asphalt/50 pt-4 border-t border-asphalt/10">
        Questions about these terms? Contact us at hammad.rent1@gmail.com or 0333-8482430.
      </p>
    </section>
  </div>
);

export default Terms;
