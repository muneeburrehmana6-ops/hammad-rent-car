// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-asphalt text-cream sticky top-0 z-50">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="font-display text-lg tracking-tight text-amber">
          HAMMAD RENT CAR
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/cars" className="hover:text-amber transition-colors">Cars</Link>
          {user && <Link to="/profile" className="hover:text-amber transition-colors">My Bookings</Link>}
          {isAdmin && <Link to="/admin" className="hover:text-amber transition-colors">Admin</Link>}
        </nav>

        <div className="hidden md:flex items-center gap-3">
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
          <Link to="/cars" onClick={() => setOpen(false)} className="block">Cars</Link>
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
