// components/SearchFilters.jsx
import React, { useState } from "react";
import { COUNTRIES } from "../constants/countries";

const categories = ["Economy", "Sedan", "SUV", "Luxury", "Van", "Hatchback"];
const transmissions = ["Automatic", "Manual"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

const SearchFilters = ({ onSearch, initial = {} }) => {
  const [filters, setFilters] = useState({
    keyword: "",
    country: "",
    city: "",
    category: "",
    transmission: "",
    fuelType: "",
    minPrice: "",
    maxPrice: "",
    seats: "",
    ...initial,
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          className="input-field"
          placeholder="Search by brand or model"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
        />
        <select name="country" value={filters.country} onChange={handleChange} className="input-field">
          <option value="">All countries</option>
          {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <input
        className="input-field"
        placeholder="City (pickup location)"
        name="city"
        value={filters.city}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <select name="category" value={filters.category} onChange={handleChange} className="input-field">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select name="transmission" value={filters.transmission} onChange={handleChange} className="input-field">
          <option value="">Any transmission</option>
          {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <select name="fuelType" value={filters.fuelType} onChange={handleChange} className="input-field">
          <option value="">Any fuel</option>
          {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>

        <input
          className="input-field"
          type="number"
          min="1"
          placeholder="Min seats"
          name="seats"
          value={filters.seats}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          className="input-field"
          type="number"
          placeholder="Min price/day"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Max price/day"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-primary w-full">Search Cars</button>
    </form>
  );
};

export default SearchFilters;
