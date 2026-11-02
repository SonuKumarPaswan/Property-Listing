"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Building2,
} from "lucide-react";
import { IProperty } from "@/data/properties";

export interface PropertyCardProps {
  property: IProperty;
}

// Format Indian currency (Lakh, Crore, or formatted rent)
export const formatPrice = (price: number, listingType: "rent" | "sale"): string => {
  if (listingType === "rent") {
    return `₹${price.toLocaleString("en-IN")}/mo`;
  }
  if (price >= 10000000) {
    const cr = (price / 10000000).toFixed(2).replace(/\.00$/, "");
    return `₹${cr} Cr`;
  }
  if (price >= 100000) {
    const lakh = (price / 100000).toFixed(2).replace(/\.00$/, "");
    return `₹${lakh} Lakh`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
};

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const primaryImage =
    property.images.find((img) => img.isPrimary)?.url ||
    property.images[0]?.url ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

  const formattedType =
    property.type.charAt(0).toUpperCase() + property.type.slice(1);

  return (
    <div className="group bg-white rounded overflow-hidden border border-[#E5E7EB] shadow-xs hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Property Image Container */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#F5F7FF]">
        <Image
          src={primaryImage}
          alt={property.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Badges (Type & Listing) */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[70%]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/90 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#2043B0] shadow-xs backdrop-blur-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
            <span>{formattedType}</span>
          </span>

          <span
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border shadow-xs backdrop-blur-xs ${property.listingType === "sale"
                ? "bg-[#2043B0] text-white border-blue-600"
                : "bg-emerald-600 text-white border-emerald-500"
              }`}
          >
            {property.listingType === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>

        {/* Status Badges (Verified, Featured, New Project) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5">
          {property.isVerified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-50/95 text-emerald-700 border border-emerald-200 shadow-xs backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
            </span>
          )}

          {property.isFeatured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-amber-50/95 text-amber-700 border border-amber-200 shadow-xs backdrop-blur-xs">
              <Sparkles className="w-3 h-3" />
              <span>Featured</span>
            </span>
          )}

          {property.isNewProject && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-blue-50/95 text-[#2043B0] border border-blue-200 shadow-xs backdrop-blur-xs">
              <Building2 className="w-3 h-3" />
              <span>New Launch</span>
            </span>
          )}
        </div>
      </div>

      {/* Property Information */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Title */}
        <Link href={`/properties/${property.slug}`}>
          <h3 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] tracking-tight group-hover:text-[#2043B0] 
          transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-[#4B5563]">
          <MapPin className="h-3.5 w-3.5 text-[#2043B0] shrink-0" />
          <span className="truncate">
            {property.location}, {property.city}
          </span>
        </div>

        {/* Specifications Strip */}
        {/* <div className="grid grid-cols-3 gap-2 my-4 p-2.5 sm:p-3 rounded bg-[#F5F7FF] border border-[#E5E7EB] text-center text-xs">
          {property.details.bedrooms > 0 ? (
            <div className="flex flex-col items-center justify-center">
              <span className="inline-flex items-center gap-1 text-[#4B5563] font-medium text-[11px]">
                <Bed className="w-3.5 h-3.5 text-[#2043B0]" /> Beds
              </span>
              <span className="text-sm font-bold text-[#172554] mt-0.5">
                {property.details.bedrooms} BHK
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="inline-flex items-center gap-1 text-[#4B5563] font-medium text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-[#2043B0]" /> Type
              </span>
              <span className="text-sm font-bold text-[#172554] mt-0.5 capitalize truncate">
                {property.type}
              </span>
            </div>
          )}

          <div className="flex flex-col items-center justify-center border-x border-[#E5E7EB] px-1">
            <span className="inline-flex items-center gap-1 text-[#4B5563] font-medium text-[11px]">
              <Bath className="w-3.5 h-3.5 text-[#2043B0]" /> Baths
            </span>
            <span className="text-sm font-bold text-[#172554] mt-0.5">
              {property.details.bathrooms > 0 ? property.details.bathrooms : "N/A"}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="inline-flex items-center gap-1 text-[#4B5563] font-medium text-[11px]">
              <Maximize2 className="w-3.5 h-3.5 text-[#2043B0]" /> Area
            </span>
            <span className="text-sm font-bold text-[#172554] mt-0.5">
              {property.details.area.toLocaleString("en-IN")}{" "}
              <span className="font-normal text-[10px] text-[#4B5563]">sqft</span>
            </span>
          </div>
        </div> */}

        {/* Card Footer: Price & Details Link */}
        <div className="mt-auto pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
              {property.listingType === "rent" ? "Monthly Rent" : "Total Price"}
            </span>
            <span className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#2043B0] truncate block">
              {formatPrice(property.price, property.listingType)}
            </span>
          </div>

          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs transition-all duration-200 gap-1.5 shadow-sm shadow-blue-900/10 shrink-0 group/link"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
