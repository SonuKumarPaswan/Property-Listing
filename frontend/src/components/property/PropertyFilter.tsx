"use client";

import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface FilterState {
  priceMin: number;
  priceMax: number;
  city: string;
  location: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
}

const PropertyFilter: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 1000000,
    city: '',
    location: '',
    propertyType: 'all',
    bedrooms: 'any',
    bathrooms: 'any',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'priceMin' || name === 'priceMax' ? Number(value) : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 1000000,
      city: '',
      location: '',
      propertyType: 'all',
      bedrooms: 'any',
      bathrooms: 'any',
    });
  };

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco'];
  const locations = ['Downtown', 'Suburbs', 'Beachfront', 'Hills', 'City Center'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden">
        {/* Header Section */}
        <div className="bg-white px-5 sm:px-6 py-5 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
              Property Filter
            </h2>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5F7FF] border border-blue-100 text-[#2043B0]">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1 font-sans">
            Find your perfect home
          </p>
        </div>

        {/* Filter Fields */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Price Range */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#172554] mb-2 font-sans">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                  MIN
                </span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#4B5563]">
                    $
                  </span>
                  <input
                    type="number"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleChange}
                    className="w-full pl-7 pr-3 py-2.5 bg-[#F5F7FF] text-[#172554] font-medium text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5 font-sans">
                  MAX
                </span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#4B5563]">
                    $
                  </span>
                  <input
                    type="number"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleChange}
                    className="w-full pl-7 pr-3 py-2.5 bg-[#F5F7FF] text-[#172554] font-medium text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#172554] mb-2 font-sans">
              City
            </label>
            <div className="relative">
              <select
                name="city"
                value={filters.city}
                onChange={handleChange}
                className="w-full appearance-none px-3.5 py-2.5 bg-[#F5F7FF] text-[#172554] font-medium text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-9"
              >
                <option value="" className="bg-white text-[#172554]">
                  Select City
                </option>
                {cities.map(city => (
                  <option key={city} value={city} className="bg-white text-[#172554]">
                    {city}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#4B5563]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#172554] mb-2 font-sans">
              Location / Neighborhood
            </label>
            <div className="relative">
              <select
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="w-full appearance-none px-3.5 py-2.5 bg-[#F5F7FF] text-[#172554] font-medium text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-9"
              >
                <option value="" className="bg-white text-[#172554]">
                  Any Location
                </option>
                {locations.map(loc => (
                  <option key={loc} value={loc} className="bg-white text-[#172554]">
                    {loc}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#4B5563]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-[#172554] mb-2 font-sans">
              Property Type
            </label>
            <div className="relative">
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleChange}
                className="w-full appearance-none px-3.5 py-2.5 bg-[#F5F7FF] text-[#172554] font-medium text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-9"
              >
                <option value="all" className="bg-white text-[#172554]">All Types</option>
                <option value="house" className="bg-white text-[#172554]">House</option>
                <option value="apartment" className="bg-white text-[#172554]">Apartment</option>
                <option value="villa" className="bg-white text-[#172554]">Villa</option>
                <option value="condo" className="bg-white text-[#172554]">Condo</option>
                <option value="townhouse" className="bg-white text-[#172554]">Townhouse</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#4B5563]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#172554] mb-2 font-sans">
                Bedrooms
              </label>
              <div className="relative">
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleChange}
                  className="w-full appearance-none px-3.5 py-2.5 bg-[#F5F7FF] text-[#172554] font-medium text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-8"
                >
                  <option value="any" className="bg-white text-[#172554]">Any</option>
                  <option value="1" className="bg-white text-[#172554]">1+</option>
                  <option value="2" className="bg-white text-[#172554]">2+</option>
                  <option value="3" className="bg-white text-[#172554]">3+</option>
                  <option value="4" className="bg-white text-[#172554]">4+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#4B5563]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[#172554] mb-2 font-sans">
                Bathrooms
              </label>
              <div className="relative">
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleChange}
                  className="w-full appearance-none px-3.5 py-2.5 bg-[#F5F7FF] text-[#172554] font-medium text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 focus:bg-white hover:border-blue-300 transition-all duration-200 cursor-pointer pr-8"
                >
                  <option value="any" className="bg-white text-[#172554]">Any</option>
                  <option value="1" className="bg-white text-[#172554]">1+</option>
                  <option value="2" className="bg-white text-[#172554]">2+</option>
                  <option value="3" className="bg-white text-[#172554]">3+</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#4B5563]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-[#E5E7EB] flex items-center gap-3 bg-[#F5F7FF]/50">
          <button
            type="button"
            onClick={resetFilters}
            className="flex-1 py-3 px-4 text-sm font-semibold text-[#172554] bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F5F7FF] hover:border-blue-300 hover:text-[#2043B0] focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20 transition-all duration-200 active:scale-[0.98] shadow-xs cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-[#2043B0] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/40 transition-all duration-200 active:scale-[0.98] shadow-sm shadow-blue-900/20 hover:shadow-md cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyFilter;

