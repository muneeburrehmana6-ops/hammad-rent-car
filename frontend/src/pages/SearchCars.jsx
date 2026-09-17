// pages/SearchCars.jsx
// A separate "Search Cars" browse page (reached from the hero's Search Cars button),
// styled with a colored search panel + a brand list sidebar — distinct from the
// regular /cars (Fleet) page reached via "Book Now", which keeps its category list.
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import CarCard from "../components/CarCard";

const SearchCars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const activeBrand = searchParams.get("brand") || "";

  useEffect(() => {
    api.get("/cars/meta/brands").then(({ data }) => setBrands(data)).catch(() => {});
  }, []);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params = { page, limit: 24 };
      if (activeBrand) params.brand = activeBrand;
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
  }, [searchParams, page, activeBrand]);

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

  const handleBrandClick = (brand) => {
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (brand) next.set("brand", brand);
    else next.delete("brand");
    setSearchParams(next);
  };

  return (
    <div className="container-x py-10">
      <Helmet>
        <title>Search Cars | Hammad Motors and Rent A Car Pakistan</title>
        <meta name="description" content="Search our fleet by brand — Toyota, Honda, BMW, Mercedes and more." />
      </Helmet>

      <h1 className="font-display text-2xl mb-6">Search Cars</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-0 rounded-xl overflow-hidden border border-asphalt/10">
          {/* Colored search panel */}
          <div className="bg-teal p-5">
            <p className="text-white font-display text-lg mb-3">Search</p>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                className="w-full rounded-full pl-4 pr-10 py-2.5 text-sm text-asphalt bg-asphalt/90 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-amber"
                placeholder="Search for cars..."
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

          {/* Brand list */}
          <div className="bg-white p-5">
            <p className="font-display text-lg mb-3">Car Brands</p>
            <ul>
              <li>
                <button
                  onClick={() => handleBrandClick("")}
                  className={`w-full text-left py-2 border-b border-asphalt/10 text-sm font-medium transition-colors ${
                    !activeBrand ? "text-amber-dark" : "text-asphalt/80 hover:text-amber-dark"
                  }`}
                >
                  All Brands
                </button>
              </li>
              {brands.map((b) => (
                <li key={b}>
                  <button
                    onClick={() => handleBrandClick(b)}
                    className={`w-full text-left py-2 border-b border-asphalt/10 last:border-0 text-sm font-medium transition-colors ${
                      activeBrand === b ? "text-amber-dark" : "text-asphalt/80 hover:text-amber-dark"
                    }`}
                  >
                    {b}
                  </button>
                </li>
              ))}
              {brands.length === 0 && (
                <li className="text-sm text-asphalt/40 py-2">No brands listed yet.</li>
              )}
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

export default SearchCars;
