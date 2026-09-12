// pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.phone);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-x py-16 max-w-md">
      <Helmet><title>Sign Up | Hammad Rent Car</title></Helmet>

      <h1 className="font-display text-2xl mb-6">Create an Account</h1>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input required className="input-field mt-1" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" required className="input-field mt-1" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <input className="input-field mt-1" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input type="password" required minLength={6} className="input-field mt-1" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-asphalt/60">
          Already have an account? <Link to="/login" className="text-teal font-medium">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
