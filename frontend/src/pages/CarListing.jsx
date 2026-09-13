// pages/CarListing.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../api/axios";
import CarCard from "../components/CarCard";
import SearchFilters from "../components/SearchFilters";

const CarListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const currentFilters = Object.fromEntries(searchParams.entries());

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
            const { data } = await api.get("/cars", { params: { ...currentFilters, page, limit: 24 } });
      setCars(data.cars);
      setPages(data.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, page]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleSearch = (filters) => {
    setPage(1);
    setSearchParams(Object.fromEntries(Object.entries(filters).filter(([, v]) => v)));
  };

  return (
    <div className="container-x py-10">
      <Helmet>
        <title>Browse Cars | Hammad Rent Car</title>
        <meta name="description" content="Browse our full fleet of rental cars with filters for price, category, and location." />
      </Helmet>

      <h1 className="font-display text-2xl mb-6">Browse Cars</h1>

      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <SearchFilters onSearch={handleSearch} initial={currentFilters} />
        </aside>

        <div className="md:col-span-3">
          {loading ? (
            <p>Loading cars...</p>
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
