"use client"

import React, { useState } from 'react';

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
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border overflow-hidden ">
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">Property Filter</h1>
        <p className="text-sm text-gray-500 mt-1">Find your perfect home</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">MIN</div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handleChange}
                  className="w-full pl-7 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-colors text-sm"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">MAX</div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handleChange}
                  className="w-full pl-7 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-colors text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <select
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-all text-sm cursor-pointer"
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location / Neighborhood</label>
          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-all text-sm cursor-pointer"
          >
            <option value="">Any Location</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-all text-sm cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-all text-sm cursor-pointer"
            >
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-all text-sm cursor-pointer"
            >
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-100 flex gap-3 bg-gray-50">
        <button
          onClick={resetFilters}
          className="flex-1 py-3.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-2xl hover:border-gray-400 transition-all active:scale-[0.985]"
        >
          Reset
        </button>
        <button
          className="flex-1 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.985] shadow-md hover:shadow-lg"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default PropertyFilter;
