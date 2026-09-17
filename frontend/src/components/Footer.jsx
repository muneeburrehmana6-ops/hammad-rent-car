// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

// Same inline SVG car-silhouette mark used in the Navbar.
const LogoMark = () => (
  <svg viewBox="0 0 48 24" className="h-6 w-12" fill="none">
    <path
      d="M2 15c3-6 8-10 14-10h10c5 0 9 3 12 7l6 1"
      stroke="#E8A33D"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 16h38c1 0 2-1 2-2v-1c0-1-1-2-2-2l-4-1c-2-3-5-5-9-5H16c-4 0-8 3-10 7l-2 2v2z"
      fill="#F3F1EC"
    />
    <circle cx="12" cy="17" r="2.5" fill="#14181C" />
    <circle cx="36" cy="17" r="2.5" fill="#14181C" />
  </svg>
);

const Footer = () => (
  <footer className="bg-asphalt text-cream/70 mt-20">
    <div className="container-x py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <LogoMark />
          <span className="font-display text-lg tracking-tight text-amber">HAMMAD MOTORS</span>
        </div>
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
