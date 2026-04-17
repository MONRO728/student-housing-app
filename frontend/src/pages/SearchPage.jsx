import React, { useState, useEffect } from 'react';
import api from '../api';
import MainLayout from '../layouts/MainLayout';
import PropertyCard from '../components/PropertyCard';
import { Filter, ChevronDown, MapPin, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Normalize a city / search string coming from URL params */
const normalizeQuery = (value) => {
  if (!value) return '';
  return value.trim();
};

/** Build the API query-string for the backend */
const buildApiParams = (searchParam, cityParam) => {
  const params = new URLSearchParams();

  // ?city=Buxoro  → backend ?search=Buxoro  (searches city__name icontains)
  // ?search=text  → backend ?search=text    (searches name, address, city__name …)
  const finalSearch = normalizeQuery(cityParam) || normalizeQuery(searchParam);
  if (finalSearch) {
    params.set('search', finalSearch);
  }

  return params.toString(); // '' when no filter → fetch all
};

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-56 bg-gray-200" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="h-4 bg-gray-100 rounded w-2/3" />
      <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// SearchPage
// ---------------------------------------------------------------------------
const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  const location  = useLocation();
  const navigate  = useNavigate();

  // ----- Parse URL params (re-computed on every render, but only triggers
  //       the effect when location.search actually changes) -----------------
  const queryParams  = new URLSearchParams(location.search);
  const searchParam  = queryParams.get('search') || '';
  const cityParam    = queryParams.get('city')   || '';

  // Human-readable label shown in the active-filter badge
  const activeLabel = normalizeQuery(cityParam) || normalizeQuery(searchParam);

  // ----- Fetch data ---------------------------------------------------------
  useEffect(() => {
    setLoading(true);
    setError(null);

    const qs       = buildApiParams(searchParam, cityParam);
    const endpoint = '/listings/properties/' + (qs ? `?${qs}` : '');

    api.get(endpoint)
      .then(res => {
        const data = res.data;
        // DRF pagination → data.results; plain list → data itself
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];
        setProperties(list);
        setLoading(false);
      })
      .catch(err => {
        console.error('[SearchPage] API error:', err);
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // re-fetch whenever the URL query string changes

  // ----- Clear the active city / search filter ------------------------------
  const clearFilter = () => navigate('/search');

  // --------------------------------------------------------------------------
  return (
    <MainLayout>
      {/* ── Filter Bar ───────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40 py-3">
        <div className="container flex flex-wrap items-center justify-between gap-3">

          {/* Left: filter chips */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Active city / search badge */}
            {activeLabel && (
              <span className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl font-semibold text-sm">
                <MapPin size={15} />
                {activeLabel}
                <button
                  onClick={clearFilter}
                  className="ml-1 hover:text-primary-dark transition-colors"
                  title="Filterni tozalash"
                >
                  <X size={14} />
                </button>
              </span>
            )}

            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl hover:border-primary hover:text-primary transition-all font-medium text-sm">
              <Filter size={16} />
              Barcha filtrlar
            </button>

            <div className="h-5 w-px bg-gray-200 hidden sm:block" />

            <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-secondary font-medium text-sm">
              Xona turi <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-secondary font-medium text-sm">
              Narxi <ChevronDown size={14} />
            </button>
          </div>

          {/* Right: result count */}
          <div className="text-sm font-medium text-gray-500">
            {!loading && !error && (
              <>{properties.length} ta natija topildi</>
            )}
          </div>
        </div>
      </div>

      {/* ── Results Area ─────────────────────────────────────────────────── */}
      <div className="min-h-[calc(100vh-145px)] bg-gray-50">
        <div className="container py-8">

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="text-6xl mb-5">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-3">Xatolik yuz berdi</h2>
              <p className="text-gray-500 mb-6 max-w-md">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all"
              >
                Qayta urinish
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && properties.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="text-6xl mb-5">🏠</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-3">E'lonlar topilmadi</h2>
              <p className="text-gray-500 mb-6 max-w-md">
                {activeLabel
                  ? `"${activeLabel}" bo'yicha hozircha e'lon mavjud emas.`
                  : "Hozircha hech qanday e'lon mavjud emas."}
              </p>
              {activeLabel && (
                <button
                  onClick={clearFilter}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all"
                >
                  Barcha e'lonlarni ko'rish
                </button>
              )}
            </div>
          )}

          {/* Success — property grid */}
          {!loading && !error && properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
