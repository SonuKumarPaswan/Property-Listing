'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80' 
    : 'bg-gray-100 text-gray-700 border-gray-200';

  const slug = property.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#F5F7FF]">
        <Image
          src={property.mainImage}
          alt={property.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Status Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border shadow-2xs backdrop-blur-xs ${statusColor}`}>
            {property.status}
          </span>
        </div>
      </div>

      {/* Property Information */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] tracking-tight group-hover:text-[#2043B0] transition-colors line-clamp-1">
          {property.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#4B5563] mt-1.5 line-clamp-1 font-sans">
          {property.address}
        </p>

        {/* Units & Occupancy Metadata */}
        <div className="grid grid-cols-2 gap-3 my-4 p-3 rounded-xl bg-[#F5F7FF] border border-[#E5E7EB]">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
              Units
            </span>
            <span className="text-sm font-bold text-[#172554] mt-0.5 block">
              {property.units} <span className="font-normal text-xs text-[#4B5563]">units</span>
            </span>
          </div>
          <div className="border-l border-[#E5E7EB] pl-3">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
              Occupancy
            </span>
            <span className="text-sm font-bold text-[#2043B0] mt-0.5 block">
              {property.occupancy}% <span className="font-normal text-xs text-[#4B5563]">rate</span>
            </span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-auto pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
          <span className="text-[#4B5563] font-medium">
            Updated {property.updated}
          </span>
          <Link
            href={`/properties/${slug}`}
            className="inline-flex items-center gap-1 font-semibold text-[#2043B0] hover:text-[#172554] transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2043B0]/30 rounded"
          >
            <span>View Listing</span>
            <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
          </Link>
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
    mainImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80'
  },
  {
    id: '2',
    title: 'Skyline Office',
    address: 'Tower B, Prawirotaman Ave, Delhi NCR 85018',
    units: 64,
    occupancy: 92,
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
    address: 'Eco Corridor 3825, Delhi NCR 85018',
    units: 48,
    occupancy: 85,
    status: 'Off Market',
    updated: 'Dec 16',
    views: 7899,
    leads: 318,
    applications: 0,
    mainImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
  },
  {
    id: '4',
    title: 'Eco Corporate Tower',
    address: 'Sector 62, Noida, Delhi NCR 201309',
    units: 95,
    occupancy: 81,
    status: 'Active',
    updated: 'Jan 04',
    views: 4520,
    leads: 89,
    applications: 12,
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
  },
  {
    id: '5',
    title: 'Metro IT Park',
    address: 'Sector 142, Noida Expressway, Delhi NCR',
    units: 120,
    occupancy: 95,
    status: 'Active',
    updated: 'Feb 11',
    views: 6100,
    leads: 142,
    applications: 19,
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=80',
  },
  {
    id: '6',
    title: 'Apex Commercial Center',
    address: 'Sector 18 Commercial District, Noida',
    units: 72,
    occupancy: 88,
    status: 'Active',
    updated: 'Mar 02',
    views: 5340,
    leads: 97,
    applications: 14,
    mainImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
  }
];

// Full Demo Page Component (Header + Grid + Load More)
const PropertyListings: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="w-full font-sans">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#E5E7EB]">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
              Featured Properties in Delhi NCR
            </h1>
            <p className="text-sm sm:text-base text-[#4B5563] mt-2 font-sans">
              Showing 124 premium office &amp; residential spaces
            </p>
          </div>
          <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E5E7EB] bg-white text-xs sm:text-sm font-medium text-[#172554] shadow-2xs">
            <span className="text-[#4B5563]">Sort:</span>
            <span className="font-semibold text-[#172554]">Newest First</span>
          </div>
        </div>

        {/* Property Grid: 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12 mb-4">
          <button
            type="button"
            className="px-8 py-3.5 bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm shadow-blue-900/20 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2043B0]/40"
          >
            Load More Properties
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyListings;

