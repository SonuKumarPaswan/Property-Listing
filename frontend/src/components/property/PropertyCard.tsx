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
    <div className="min-h-screen  font-sans rounded-lg">

      {/* Results Info */}
      <div className="px-6 py-2">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Featured Properties in Delhi NCR</h1>
            <p className="text-gray-500 mt-1">Showing 124 premium office &amp; residential spaces</p>
          </div>
          <div className="text-sm text-gray-500">Sort: Newest First</div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
