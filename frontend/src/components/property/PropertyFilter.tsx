"use client";

import React, { useState, useEffect } from "react";
import { SlidersHorizontal, RotateCcw, Check, ChevronDown } from "lucide-react";

export interface FilterValues {
  priceMin: string;
  priceMax: string;
  city: string;
  location: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
}

export const defaultFilters: FilterValues = {
  priceMin: "",
  priceMax: "",
  city: "",
  location: "",
  propertyType: "all",
  bedrooms: "any",
  bathrooms: "any",
};

interface PropertyFilterProps {
  currentFilters: FilterValues;
  onApply: (filters: FilterValues) => void;
  onReset: () => void;
  availableCities: string[];
  availableLocations: string[];
  availableTypes: string[];
  listingType?: "sale" | "rent" | "all";
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({
  currentFilters,
  onApply,
  onReset,
  availableCities,
  availableLocations,
  availableTypes,
  listingType = "all",
}) => {
  const [localFilters, setLocalFilters] = useState<FilterValues>(currentFilters);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onApply(localFilters);
    setIsOpenMobile(false);
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
    onReset();
    setIsOpenMobile(false);
  };

  // Count active non-default filters
  const activeCount = Object.entries(localFilters).filter(([key, val]) => {
    if (key === "propertyType") return val !== "all";
    if (key === "bedrooms" || key === "bathrooms") return val !== "any";
    return val !== "";
  }).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#172554] shadow-xs hover:border-blue-300 transition-all cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#2043B0]" />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="h-5 w-5 rounded-full bg-[#2043B0] text-white text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpenMobile ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Filter Card Container */}
      <div
        className={`${
          isOpenMobile ? "block" : "hidden"
        } lg:block w-full bg-white rounded border border-[#E5E7EB] shadow-xs hover:border-blue-200 transition-all duration-300 overflow-hidden mb-6 lg:mb-0`}
      >
        {/* Header Section */}
        <div className="bg-white px-5 sm:px-6 py-5 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
              Filter Properties
            </h2>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F5F7FF] border border-blue-100 text-[#2043B0]">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1 font-sans">
            Refine listings by price, location &amp; specs
          </p>
        </div>

        {/* Filter Fields Form */}
        <form onSubmit={handleApply} className="p-5 sm:p-6 space-y-4 sm:space-y-5">
          {/* Price Range (₹) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#172554]">
                Price Range (₹)
              </label>
              {listingType === "rent" && (
                <span className="text-[11px] font-medium text-[#2043B0] bg-blue-50 px-2 py-0.5 rounded">
                  Monthly Rent
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1">
                  Min (₹)
                </span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#4B5563]">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="priceMin"
                    value={localFilters.priceMin}
                    onChange={handleChange}
                    placeholder={listingType === "rent" ? "10,000" : "10,00,000"}
                    className="w-full pl-7 pr-3 py-2 bg-[#F5F7FF] text-[#172554] font-medium text-xs sm:text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1">
                  Max (₹)
                </span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#4B5563]">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="priceMax"
                    value={localFilters.priceMax}
                    onChange={handleChange}
                    placeholder={listingType === "rent" ? "1,00,000" : "5,00,00,000"}
                    className="w-full pl-7 pr-3 py-2 bg-[#F5F7FF] text-[#172554] font-medium text-xs sm:text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* City Selection */}
          <div>
            <label
              htmlFor="filter-city"
              className="block text-xs sm:text-sm font-semibold text-[#172554] mb-1.5"
            >
              City
            </label>
            <div className="relative">
              <select
                id="filter-city"
                name="city"
                value={localFilters.city}
                onChange={handleChange}
                className="w-full appearance-none px-3.5 py-2 bg-[#F5F7FF] text-[#172554] font-medium text-xs sm:text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-9"
              >
                <option value="">All Indian Cities</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#4B5563]">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Location / Sector Selection */}
          <div>
            <label
              htmlFor="filter-location"
              className="block text-xs sm:text-sm font-semibold text-[#172554] mb-1.5"
            >
              Location / Sector
            </label>
            <div className="relative">
              <select
                id="filter-location"
                name="location"
                value={localFilters.location}
                onChange={handleChange}
                className="w-full appearance-none px-3.5 py-2 bg-[#F5F7FF] text-[#172554] font-medium text-xs sm:text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-9"
              >
                <option value="">All Localities / Sectors</option>
                {availableLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#4B5563]">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label
              htmlFor="filter-propertyType"
              className="block text-xs sm:text-sm font-semibold text-[#172554] mb-1.5"
            >
              Property Type
            </label>
            <div className="relative">
              <select
                id="filter-propertyType"
                name="propertyType"
                value={localFilters.propertyType}
                onChange={handleChange}
                className="w-full appearance-none px-3.5 py-2 bg-[#F5F7FF] text-[#172554] font-medium text-xs sm:text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-9"
              >
                <option value="all">All Property Types</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type} className="capitalize">
                    {type === "office"
                      ? "Office Space"
                      : type === "shop"
                      ? "Commercial Shop"
                      : type === "plot"
                      ? "Plot / Land"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#4B5563]">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="filter-bedrooms"
                className="block text-xs sm:text-sm font-semibold text-[#172554] mb-1.5"
              >
                Bedrooms
              </label>
              <div className="relative">
                <select
                  id="filter-bedrooms"
                  name="bedrooms"
                  value={localFilters.bedrooms}
                  onChange={handleChange}
                  className="w-full appearance-none px-3 py-2 bg-[#F5F7FF] text-[#172554] font-medium text-xs sm:text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-8"
                >
                  <option value="any">Any BHK</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#4B5563]">
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="filter-bathrooms"
                className="block text-xs sm:text-sm font-semibold text-[#172554] mb-1.5"
              >
                Bathrooms
              </label>
              <div className="relative">
                <select
                  id="filter-bathrooms"
                  name="bathrooms"
                  value={localFilters.bathrooms}
                  onChange={handleChange}
                  className="w-full appearance-none px-3 py-2 bg-[#F5F7FF] text-[#172554] font-medium text-xs sm:text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-8"
                >
                  <option value="any">Any</option>
                  <option value="1">1+ Bath</option>
                  <option value="2">2+ Bath</option>
                  <option value="3">3+ Bath</option>
                  <option value="4">4+ Bath</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#4B5563]">
                  <ChevronDown className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold text-[#172554] bg-white border border-[#E5E7EB] rounded-xl hover:bg-[#F5F7FF] hover:border-blue-300 hover:text-[#2043B0] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 px-3 text-xs sm:text-sm font-semibold text-white bg-[#2043B0] rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm shadow-blue-900/15 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PropertyFilter;
