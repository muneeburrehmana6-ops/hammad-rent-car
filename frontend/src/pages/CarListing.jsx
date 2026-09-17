// pages/CarListing.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import CarCard from "../components/CarCard";

const CATEGORIES = ["Economy", "Sedan", "SUV", "Luxury", "Van", "Hatchback", "Convertible"];

const CarListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const activeCategory = searchParams.get("category") || "";

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params = { page, limit: 24 };
      if (activeCategory) params.category = activeCategory;
      const keywordParam = searchParams.get("keyword");
      if (keywordParam) params.keyword = keywordParam;

      const { data } = await api.get("/cars", { params });
      setCars(data.cars);
      setPages(data.pages || 1);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [searchParams, page, activeCategory]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (keyword) next.set("keyword", keyword);
    else next.delete("keyword");
    setSearchParams(next);
  };

  const handleCategoryClick = (cat) => {
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (cat) next.set("category", cat);
    else next.delete("category");
    setSearchParams(next);
  };

  return (
    <div className="container-x py-10">
      <Helmet>
        <title>Browse Cars | Hammad Motors and Rent A Car Pakistan</title>
        <meta name="description" content="Browse our full fleet of rental cars in Pakistan by category." />
      </Helmet>

      <h1 className="font-display text-2xl mb-6">Browse Cars</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-6">
          {/* Simple keyword search */}
          <div className="bg-asphalt rounded-xl p-5">
            <p className="text-cream font-display text-lg mb-3">Search</p>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                className="w-full rounded-full pl-4 pr-10 py-2.5 text-sm text-asphalt focus:outline-none focus:ring-2 focus:ring-amber"
                placeholder="Search by brand or model..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber flex items-center justify-center"
              >
                🔍
              </button>
            </form>
          </div>

          {/* Category list */}
          <div className="card p-5">
            <p className="font-display text-lg mb-3">Car Categories</p>
            <ul>
              <li>
                <button
                  onClick={() => handleCategoryClick("")}
                  className={`w-full text-left py-2 border-b border-asphalt/10 text-sm font-medium transition-colors ${
                    !activeCategory ? "text-amber-dark" : "text-asphalt/80 hover:text-amber-dark"
                  }`}
                >
                  All Categories
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className={`w-full text-left py-2 border-b border-asphalt/10 last:border-0 text-sm font-medium transition-colors ${
                      activeCategory === cat ? "text-amber-dark" : "text-asphalt/80 hover:text-amber-dark"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="md:col-span-3">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-asphalt/10" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-asphalt/10 rounded w-3/4" />
                    <div className="h-3 bg-asphalt/10 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="card p-10 text-center text-asphalt/60">
              <p>Couldn't load cars right now — the server might still be waking up.</p>
              <button onClick={fetchCars} className="btn-outline mt-4 !py-2 !px-5">
                Try Again
              </button>
            </div>
          ) : cars.length === 0 ? (
            <p className="text-asphalt/60">No cars found matching your search.</p>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => <CarCard key={car._id} car={car} />)}
              </div>

              {pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-3 py-1.5 rounded-md text-sm ${
                        p === page ? "bg-amber text-asphalt" : "bg-white border border-asphalt/20"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListing;
