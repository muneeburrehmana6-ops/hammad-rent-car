// pages/ContactUs.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Us | Hammad Motors and Rent A Car Pakistan</title>
        <meta
          name="description"
          content="Get in touch with Hammad Motors and Rent A Car Pakistan — Gujrat, Pakistan. Call, email, or WhatsApp us to book your car today."
        />
      </Helmet>

      <section className="bg-asphalt text-cream py-16">
        <div className="container-x max-w-3xl">
          <span className="text-amber text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
          <h1 className="font-display text-3xl md:text-4xl mt-2">Contact Us</h1>
          <p className="text-cream/70 mt-3 max-w-lg">
            Have a question, or ready to book? Reach out any time — our team is available 24/7.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
          <div className="card p-6">
            <p className="text-amber-dark text-xs font-semibold uppercase tracking-wide mb-2">Our Address</p>
            <p className="text-asphalt/80">Madina Syedan, Gujrat, Pakistan</p>
          </div>

          <div className="card p-6">
            <p className="text-amber-dark text-xs font-semibold uppercase tracking-wide mb-2">Phone Numbers</p>
            <p className="text-asphalt/80">Hammad Ali (CEO): <a href="tel:03338482430" className="text-teal font-medium">0333-8482430</a></p>
            <p className="text-asphalt/80 mt-1">Muazzam Ali (Manager): <a href="tel:03348239124" className="text-teal font-medium">0334-8239124</a></p>
          </div>

          <div className="card p-6">
            <p className="text-amber-dark text-xs font-semibold uppercase tracking-wide mb-2">Email</p>
            <a href="mailto:hammad.rent1@gmail.com" className="text-teal font-medium">hammad.rent1@gmail.com</a>
          </div>
        </div>

        <div className="card p-6 mt-6 max-w-4xl">
          <p className="font-semibold text-asphalt mb-3">Our Team</p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-asphalt/80">
            <p><span className="text-asphalt/50">CEO:</span> Syed Hammad Ali</p>
            <p><span className="text-asphalt/50">Manager:</span> Syed Muazzam Ali</p>
            <p><span className="text-asphalt/50">Team Member:</span> Syed Abbas Haider</p>
            <p><span className="text-asphalt/50">Team Member:</span> Muneeb ur Rehman</p>
          </div>
        </div>

        <a
          href="https://wa.me/923338482430?text=Hi!%20I%20have%20a%20question%20about%20renting%20a%20car."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex mt-6"
        >
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
};

export default ContactUs;
