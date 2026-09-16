// pages/AboutUs.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>
      <Helmet>
        <title>About Us | Hammad Motors and Rent A Car Pakistan</title>
        <meta
          name="description"
          content="Hammad Motors and Rent A Car Pakistan — based in Gujrat, serving all cities of Pakistan with luxury cars, drivers, and transparent pricing."
        />
      </Helmet>

      <section className="bg-asphalt text-cream py-16">
        <div className="container-x max-w-3xl">
          <span className="text-amber text-xs font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="font-display text-3xl md:text-4xl mt-2">
            Best Car Rental Company Based in Gujrat, Pakistan
          </h1>
        </div>
      </section>

      <section className="container-x py-16 max-w-3xl space-y-6 text-asphalt/80 leading-relaxed">
        <p>
          Hammad Motors and Rent A Car Pakistan is a trusted car rental company based in
          Madina Syedan, Gujrat. While we're proudly rooted in Gujrat, our service reaches
          customers across every major city in Pakistan — from Lahore and Islamabad to
          Faisalabad, Karachi, and beyond.
        </p>
        <p>
          Whether you're looking for a short-term rental for a business trip or a longer
          rental for a family trip, we have a wide range of vehicles to suit your needs and
          budget — from everyday economy cars to premium luxury vehicles, available with or
          without a professional driver.
        </p>
        <p>
          We also offer flexible pickup and drop-off locations, so renting a car is always
          convenient no matter where you are in Pakistan. Our team is available 24/7 to help
          you plan your trip, answer questions, and make sure your ride is ready exactly when
          and where you need it.
        </p>
        <p>
          Every car in our fleet is maintained to a high standard, so you can expect a smooth,
          comfortable, and safe ride — whether you choose economy or luxury.
        </p>

        <div className="card p-6 mt-8">
          <p className="font-semibold text-asphalt mb-3">Our Team</p>
          <ul className="space-y-1 text-sm">
            <li><span className="text-asphalt/50">CEO:</span> Syed Hammad Ali</li>
            <li><span className="text-asphalt/50">Manager:</span> Syed Muazzam Ali</li>
            <li><span className="text-asphalt/50">Team Member:</span> Syed Abbas Haider</li>
            <li><span className="text-asphalt/50">Team Member:</span> Muneeb ur Rehman</li>
          </ul>
        </div>

        <Link to="/contact" className="btn-primary inline-flex mt-4">Contact Us</Link>
      </section>
    </div>
  );
};

export default AboutUs;
