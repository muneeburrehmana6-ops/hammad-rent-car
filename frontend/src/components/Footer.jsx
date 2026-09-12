// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-asphalt text-cream/70 mt-20">
    <div className="container-x py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <p className="font-display text-amber mb-3">HAMMAD RENT CAR</p>
        <p>Reliable, affordable car rentals — book online in minutes.</p>
      </div>
      <div>
        <p className="text-cream mb-3 font-semibold">Company</p>
        <ul className="space-y-2">
          <li><Link to="/cars" className="hover:text-amber">Browse Cars</Link></li>
          <li><Link to="/login" className="hover:text-amber">Login</Link></li>
          <li><Link to="/signup" className="hover:text-amber">Sign Up</Link></li>
        </ul>
      </div>
      <div>
        <p className="text-cream mb-3 font-semibold">Support</p>
        <ul className="space-y-2">
          <li>FAQs</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className="text-cream mb-3 font-semibold">Contact</p>
        <p>0300-0000000</p>
        <p>info@hammadrentcar.com</p>
      </div>
    </div>
    <div className="border-t border-cream/10 py-4 text-center text-xs">
      © {new Date().getFullYear()} Hammad Rent Car. All rights reserved.
    </div>
  </footer>
);

export default Footer;
