// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

const PHONE_NUMBER = "0333-8482430";
const PHONE_TEL = "+923338482430";

// Simple inline SVG car-silhouette mark — no heavy image file needed.
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

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/cars", label: "Fleet" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-asphalt text-cream sticky top-0 z-50">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <LogoMark />
          <span className="font-display text-base md:text-lg tracking-tight text-amber leading-none">
            HAMMAD MOTORS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-amber transition-colors">
              {link.label}
            </Link>
          ))}
          {user && <Link to="/profile" className="hover:text-amber transition-colors">My Bookings</Link>}
          {isAdmin && <Link to="/admin" className="hover:text-amber transition-colors">Admin</Link>}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 text-sm">
            <span className="w-8 h-8 rounded-full border border-amber/40 flex items-center justify-center text-amber">
              📞
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] uppercase tracking-wide text-cream/50">For Car Rental</span>
              <span className="block font-semibold">{PHONE_NUMBER}</span>
            </span>
          </a>

          {user ? (
            <>
              <NotificationBell />
              <span className="text-sm text-cream/70">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={handleLogout} className="text-sm text-cream/70 hover:text-amber">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-amber">Login</Link>
              <Link to="/signup" className="btn-primary !py-2 !px-4 text-sm">Sign Up</Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className="block w-6 h-0.5 bg-cream mb-1" />
          <span className="block w-6 h-0.5 bg-cream mb-1" />
          <span className="block w-6 h-0.5 bg-cream" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-cream/10 px-4 py-4 space-y-3">
          <a href={`tel:${PHONE_TEL}`} className="block font-semibold text-amber">
            📞 {PHONE_NUMBER}
          </a>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="block">
              {link.label}
            </Link>
          ))}
          {user && <Link to="/profile" onClick={() => setOpen(false)} className="block">My Bookings</Link>}
          {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="block">Admin</Link>}
          {user ? (
            <button onClick={handleLogout} className="block text-left">Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="block">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
