// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-asphalt text-cream/70 mt-20">
    <div className="container-x py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <img src="/logo.png" alt="Hammad Motors and Rent A Car Pakistan" className="h-14 w-auto mb-3" />
        <p>Hammad Motors and Rent A Car Pakistan — all luxury cars available with driver in all cities of Pakistan.</p>
      </div>
      <div>
        <p className="text-cream mb-3 font-semibold">Company</p>
        <ul className="space-y-2">
          <li><Link to="/about" className="hover:text-amber">About Us</Link></li>
          <li><Link to="/cars" className="hover:text-amber">Fleet</Link></li>
          <li><Link to="/contact" className="hover:text-amber">Contact Us</Link></li>
        </ul>
      </div>
      <div>
        <p className="text-cream mb-3 font-semibold">Support</p>
        <ul className="space-y-2">
          <li><Link to="/faqs" className="hover:text-amber">FAQs</Link></li>
          <li><Link to="/terms" className="hover:text-amber">Terms &amp; Conditions</Link></li>
          <li><Link to="/privacy" className="hover:text-amber">Privacy Policy</Link></li>
        </ul>
      </div>
      <div>
        <p className="text-cream mb-3 font-semibold">Contact</p>
        <p>Hammad Ali: 0333-8482430</p>
        <p>Muazzam Ali: 0334-8239124</p>
        <p>hammad.rent1@gmail.com</p>
        <p className="mt-2">Madina Syedan, Gujrat, Pakistan</p>
      </div>
    </div>
    <div className="border-t border-cream/10 py-4 text-center text-xs px-4">
      © {new Date().getFullYear()} Hammad Motors and Rent A Car Pakistan. All rights reserved.
    </div>
  </footer>
);

export default Footer;
