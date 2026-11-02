"use client";

import React, { useState, useMemo } from "react";
import { PROPERTIES } from "@/data/properties";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilter, {
  FilterValues,
  defaultFilters,
} from "@/components/property/PropertyFilter";
import SearchBar from "@/components/property/SearchBar";
import { ArrowUpDown, Home, RotateCcw } from "lucide-react";

export type ListingMode = "all" | "sale" | "rent" | "new" | "commercial";

interface SharedPropertyListingsProps {
  mode: ListingMode;
  title?: string;
  description?: string;
}

const SharedPropertyListings: React.FC<SharedPropertyListingsProps> = ({
  mode,
  title,
  description,
}) => {
  // Mode-based default titles & descriptions
  const defaultHeader = useMemo(() => {
    switch (mode) {
      case "sale":
        return {
          badge: "Properties for Sale",
          title: title || "Buy Properties in India",
          description:
            description ||
            "Explore verified residential apartments, luxury villas, and plots available for sale.",
        };
      case "rent":
        return {
          badge: "Rental Listings",
          title: title || "Properties for Rent in India",
          description:
            description ||
            "Discover verified rental flats, studios, and residential homes across prime cities.",
        };
      case "commercial":
        return {
          badge: "Commercial Real Estate",
          title: title || "Commercial Properties in India",
          description:
            description ||
            "Explore grade-A office spaces, corporate towers, and commercial shops in prime business districts.",
        };
      case "new":
        return {
          badge: "New Launches & Projects",
          title: title || "New Project Developments",
          description:
            description ||
            "Newly launched and upcoming development complexes and residential projects with modern amenities.",
        };
      case "all":
      default:
        return {
          badge: "All Listings",
          title: title || "Verified Properties Across India",
          description:
            description ||
            "Browse thousands of verified homes, apartments, villas, commercial offices, and plots.",
        };
    }
  }, [mode, title, description]);

  // 1. Filter by mode
  const baseProperties = useMemo(() => {
    switch (mode) {
      case "sale":
        return PROPERTIES.filter((p) => p.listingType === "sale");
      case "rent":
        return PROPERTIES.filter((p) => p.listingType === "rent");
      case "commercial":
        return PROPERTIES.filter((p) =>
          ["office", "shop", "commercial"].includes(p.type)
        );
      case "new":
        return PROPERTIES.filter((p) => Boolean(p.isNewProject));
      case "all":
      default:
        return PROPERTIES;
    }
  }, [mode]);

  // Extract dynamic cities, locations, and types available for this mode
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    baseProperties.forEach((p) => set.add(p.city));
    return Array.from(set).sort();
  }, [baseProperties]);

  const availableLocations = useMemo(() => {
    const set = new Set<string>();
    baseProperties.forEach((p) => set.add(p.location));
    return Array.from(set).sort();
  }, [baseProperties]);

  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    baseProperties.forEach((p) => set.add(p.type));
    return Array.from(set).sort();
  }, [baseProperties]);

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(defaultFilters);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [visibleCount, setVisibleCount] = useState(9);

  // 2. Filter by search query + applied filters
  const filteredProperties = useMemo(() => {
    let result = [...baseProperties];

    // Search filter (title, city, location, type)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      );
    }

    // Min Price
    if (appliedFilters.priceMin !== "" && !isNaN(Number(appliedFilters.priceMin))) {
      result = result.filter((p) => p.price >= Number(appliedFilters.priceMin));
    }

    // Max Price
    if (appliedFilters.priceMax !== "" && !isNaN(Number(appliedFilters.priceMax))) {
      result = result.filter((p) => p.price <= Number(appliedFilters.priceMax));
    }

    // City
    if (appliedFilters.city) {
      result = result.filter(
        (p) => p.city.toLowerCase() === appliedFilters.city.toLowerCase()
      );
    }

    // Location
    if (appliedFilters.location) {
      result = result.filter(
        (p) => p.location.toLowerCase() === appliedFilters.location.toLowerCase()
      );
    }

    // Property Type
    if (appliedFilters.propertyType && appliedFilters.propertyType !== "all") {
      result = result.filter(
        (p) => p.type.toLowerCase() === appliedFilters.propertyType.toLowerCase()
      );
    }

    // Bedrooms
    if (appliedFilters.bedrooms && appliedFilters.bedrooms !== "any") {
      const minBeds = Number(appliedFilters.bedrooms);
      result = result.filter((p) => p.details.bedrooms >= minBeds);
    }

    // Bathrooms
    if (appliedFilters.bathrooms && appliedFilters.bathrooms !== "any") {
      const minBaths = Number(appliedFilters.bathrooms);
      result = result.filter((p) => p.details.bathrooms >= minBaths);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "area-desc":
        result.sort((a, b) => b.details.area - a.details.area);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [baseProperties, searchQuery, appliedFilters, sortBy]);

  const handleApplyFilters = (filters: FilterValues) => {
    setAppliedFilters(filters);
    setVisibleCount(9);
  };

  const handleResetFilters = () => {
    setAppliedFilters(defaultFilters);
    setSearchQuery("");
    setVisibleCount(9);
  };

  const currentDisplayList = filteredProperties.slice(0, visibleCount);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="bg-[#F5F7FF] min-h-screen text-[#172554] antialiased py-6 sm:py-8 md:py-10">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="bg-white rounded border border-[#E5E7EB] p-6 sm:p-8 lg:p-10 shadow-xs mb-6 sm:mb-8 transition-all">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-3 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded bg-[#2043B0]" />
              <span>{defaultHeader.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
              {defaultHeader.title}
            </h1>

            <p className="mt-2 text-sm sm:text-base text-[#4B5563] max-w-3xl leading-relaxed">
              {defaultHeader.description}
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setVisibleCount(9);
            }}
            onClear={() => setSearchQuery("")}
            resultsCount={filteredProperties.length}
          />

          {/* Main Content Layout: Sidebar + Listings Grid */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Filter Sidebar */}
            <div className="w-full lg:w-[320px] shrink-0 sticky lg:top-24">
              <PropertyFilter
                currentFilters={appliedFilters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                availableCities={availableCities}
                availableLocations={availableLocations}
                availableTypes={availableTypes}
                listingType={mode === "rent" ? "rent" : mode === "sale" ? "sale" : "all"}
              />
            </div>

            {/* Property Listings Content */}
            <div className="flex-1 w-full min-w-0">
              {/* Listings Sub-Header (Sort & Status) */}
              <div className="bg-white rounded border border-[#E5E7EB] p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="text-xs sm:text-sm text-[#4B5563]">
                  Showing{" "}
                  <strong className="text-[#172554] font-bold">
                    {Math.min(visibleCount, filteredProperties.length)}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-[#2043B0] font-bold">
                    {filteredProperties.length}
                  </strong>{" "}
                  properties
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#4B5563]" />
                  <label htmlFor="sort-properties" className="text-xs text-[#4B5563] font-medium">
                    Sort by:
                  </label>
                  <select
                    id="sort-properties"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] bg-[#F5F7FF] text-xs 
                    font-semibold text-[#172554] focus:outline-none focus:border-[#2043B0] cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="area-desc">Area: Largest First</option>
                  </select>
                </div>
              </div>

              {/* Property Grid or Empty State */}
              {currentDisplayList.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                    {currentDisplayList.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {visibleCount < filteredProperties.length && (
                    <div className="flex justify-center mt-10 mb-4">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="py-3 px-8 rounded bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm transition-all duration-200 shadow-sm shadow-blue-900/20 active:scale-[0.98] cursor-pointer"
                      >
                        Load More Properties (
                        {filteredProperties.length - visibleCount} remaining)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Empty Results State */
                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 text-center shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-[#F5F7FF] border border-blue-100 flex items-center justify-center mx-auto mb-4 text-[#2043B0]">
                    <Home className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#172554] tracking-tight mb-2">
                    No Properties Found
                  </h3>

                  <p className="text-sm text-[#4B5563] max-w-md mx-auto mb-6 leading-relaxed">
                    We could not find any properties matching your current search or
                    filter parameters. Try clearing some filters or searching with
                    different keywords.
                  </p>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#2043B0] hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharedPropertyListings;

