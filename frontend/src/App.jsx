// App.jsx - main app routes
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import CarListing from "./pages/CarListing";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarListing />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/booking/:carId"
            element={<ProtectedRoute><Booking /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>}
          />

          <Route path="*" element={<div className="container-x py-20 text-center">Page not found</div>} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
