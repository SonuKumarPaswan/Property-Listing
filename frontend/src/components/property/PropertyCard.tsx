'use client';

import React from 'react';
import Image from 'next/image';

interface Property {
  id: string;
  title: string;
  address: string;
  units: number;
  occupancy: number;
  status: 'Active' | 'Off Market';
  updated: string;
  views: number;
  leads: number;
  applications: number;
  mainImage: string;
  secondaryImage: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const statusColor = property.status === 'Active' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Main Image */}
      <div className="relative h-56">
        <Image
          src={property.mainImage}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}>
            {property.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{property.address}</p>

        <div className="flex items-center gap-4 text-sm mb-5">
          <div>
            <span className="font-semibold text-gray-900">{property.units}</span>
            <span className="text-gray-500"> units</span>
          </div>
          <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
          <div>
            <span className="font-semibold text-emerald-600">{property.occupancy}%</span>
            <span className="text-gray-500"> occupancy rate</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div>Updated {property.updated}</div>
          <a href="#" className="text-blue-600 hover:underline font-medium">View Listing →</a>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Past 30 days</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-semibold text-gray-900">{property.views.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Views</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">{property.leads}</div>
              <div className="text-xs text-gray-500">Leads</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900">{property.applications}</div>
              <div className="text-xs text-gray-500">Applications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Image */}
      <div className="px-5 pb-5">
        <div className="relative h-40 rounded-xl overflow-hidden">
          <Image
            src={property.secondaryImage}
            alt={`${property.title} exterior`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

// Sample data for demo
const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Buisness Space',
    address: '3825 E Prawirotaman Ave, Delhi NCR 85018',
    units: 86,
    occupancy: 78,
    status: 'Active',
    updated: 'Oct 12',
    views: 3233,
    leads: 67,
    applications: 8,
    mainImage:  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80'
  },
  {
    id: '2',
    title: 'Skyline Office',
    address: '3825 E Prawirotaman Ave, Delhi NCR 85018',
    units: 86,
    occupancy: 78,
    status: 'Active',
    updated: 'Nov 22',
    views: 7239,
    leads: 38,
    applications: 5,
    mainImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
  },
  {
    id: '3',
    title: 'Sustain Spaces',
    address: '3825 E Prawirotaman Ave, Delhi NCR 85018',
    units: 86,
    occupancy: 78,
    status: 'Off Market',
    updated: 'Dec 16',
    views: 7899,
    leads: 318,
    applications: 0,
    mainImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
  }
];

// Full Demo Page Component (Filters + Cards)
const PropertyListings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header / Filters */}
      <div className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">M</div>
              <div>
                <div className="font-bold text-2xl tracking-tight text-gray-900">Mishti Spaces</div>
                <div className="text-[10px] text-gray-500 -mt-1">Premium Properties</div>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full bg-gray-100 border border-gray-200 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-pink-300 text-black text-sm transition-colors"
                />
                <div className="absolute left-4 top-3.5 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 bg-blue-300 px-4 py-3 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-300 transition-colors">
              📍 <span>Noida, UP , India</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-sm">
                <button className="px-5 py-2 bg-blue-500 shadow-sm rounded-full font-medium">Grid View</button>
                <button className="px-5 py-2 text-white bg-blue-300 shadow-sm rounded-full ">List View</button>
              </div>

              <div className="flex items-center bg-blue-300 rounded-full px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-200">
                Newest ↓
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Featured Properties in Delhi NCR</h1>
            <p className="text-gray-500 mt-1">Showing 124 premium office &amp; residential spaces</p>
          </div>
          <div className="text-sm text-gray-500">Sort: Newest First</div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3.5 bg-gray-900 hover:bg-black text-white rounded-full font-medium transition-colors">
            Load More Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;
export { PropertyCard };