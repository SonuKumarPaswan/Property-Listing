"use client";

import { useState } from "react";
import { Bed, Bath, Maximize2, Car, CheckCircle2, Sparkles, MapPin } from "lucide-react";

interface PropertyDetailsProps {
  property: {
    title?: string;
    description?: string;
    details?: {
      bedrooms?: number;
      bathrooms?: number;
      area?: number;
      areaUnit?: string;
      parking?: boolean;
      furnishing?: string;
    };
    amenities?: string[];
    location?: {
      address?: string;
      city?: string;
      state?: string;
    };
    pincode?: string;
    metro?: string;
    landmark?: string;
  };
}

const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "details", label: "Details" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:border-blue-200 hover:shadow-md transition-all duration-300 p-6 sm:p-8 md:p-10 font-sans">
        {/* Main Property Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-tight mb-8 break-words">
          {property?.title || "Premium 3 BHK Apartment"}
        </h2>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-[#F5F7FF] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4B5563]">
                Bedrooms
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/70 text-[#2043B0]">
                <Bed className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#172554] tracking-tight">
              {property.details?.bedrooms ?? 3}
            </p>
          </div>

          <div className="bg-[#F5F7FF] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4B5563]">
                Bathrooms
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/70 text-[#2043B0]">
                <Bath className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#172554] tracking-tight">
              {property.details?.bathrooms ?? 2}
            </p>
          </div>

          <div className="bg-[#F5F7FF] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4B5563]">
                Area
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/70 text-[#2043B0]">
                <Maximize2 className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-[#172554] tracking-tight">
              {property.details?.area ?? 1800}{" "}
              <span className="text-base sm:text-lg font-medium text-[#2043B0]">
                {property.details?.areaUnit ?? "sqft"}
              </span>
            </p>
          </div>

          <div className="bg-[#F5F7FF] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4B5563]">
                Parking
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/70 text-[#2043B0]">
                <Car className="h-4 w-4" />
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-[#172554] tracking-tight">
              {property.details?.parking ? "Available" : "Not Available"}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#E5E7EB] mb-8">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar pb-px">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-5 text-sm sm:text-base font-semibold border-b-2 transition-all duration-200 whitespace-nowrap cursor-pointer rounded-t-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2043B0]/30 ${
                    isActive
                      ? "border-[#2043B0] text-[#2043B0] bg-[#F5F7FF] font-bold shadow-2xs"
                      : "border-transparent text-[#4B5563] hover:text-[#2043B0] hover:bg-[#F5F7FF]/50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content: Description */}
        {activeTab === "description" && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#172554] tracking-tight mb-3">
                Property Description
              </h3>
              <p className="text-[#4B5563] leading-relaxed text-base sm:text-lg font-sans">
                {property?.description ||
                  "Experience modern living in this beautifully designed property located in a prime area. The home features spacious rooms, abundant natural light, premium interiors, and thoughtfully planned layouts to provide maximum comfort. With excellent connectivity to schools, hospitals, shopping centers, metro stations, and major business hubs, this property offers the perfect combination of convenience and luxury for families and professionals alike."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F5F7FF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-blue-200 transition-colors">
                <h4 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#2043B0]" />
                  Property Highlights
                </h4>
                <ul className="space-y-3">
                  {[
                    "Prime Location",
                    "Spacious Living Areas",
                    "Modern Architecture",
                    "Premium Interior Finishes",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm sm:text-base font-medium text-[#4B5563]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F5F7FF] border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:border-blue-200 transition-colors">
                <h4 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#2043B0]" />
                  Nearby Facilities
                </h4>
                <ul className="space-y-3">
                  {[
                    "Schools & Colleges",
                    "Hospitals & Clinics",
                    "Shopping Malls",
                    "Metro & Public Transport",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm sm:text-base font-medium text-[#4B5563]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Details */}
        {activeTab === "details" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {Object.entries(property?.details || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between border border-[#E5E7EB] p-4 sm:p-5 rounded-xl bg-white hover:bg-[#F5F7FF]/40 hover:border-blue-200 shadow-xs transition-all duration-200"
              >
                <span className="capitalize text-sm sm:text-base font-medium text-[#4B5563]">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="font-bold text-sm sm:text-base text-[#172554] text-right ml-4 break-words">
                  {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Amenities */}
        {activeTab === "amenities" && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(
              property?.amenities || [
                "gym",
                "pool",
                "security",
                "elevator",
                "power_backup",
                "cctv",
              ]
            ).map((amenity: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#F5F7FF] border border-[#E5E7EB] p-4 rounded-xl shadow-xs hover:border-blue-300 hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#2043B0]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="capitalize font-semibold text-sm sm:text-base text-[#172554]">
                  {amenity.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Location */}
        {activeTab === "location" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {[
              { label: "Address", value: property.location?.address || "Address not provided" },
              { label: "City", value: property.location?.city || "City not provided" },
              { label: "State", value: property.location?.state || "State not provided" },
              { label: "Pincode", value: property.pincode || "Not provided" },
              { label: "Nearby Metro", value: property.metro || "Not provided" },
              { label: "Landmark", value: property.landmark || "Not provided" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white border border-[#E5E7EB] p-4 sm:p-5 rounded-xl shadow-xs hover:border-blue-200 transition-colors"
              >
                <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4B5563] mb-1.5">
                  {item.label}
                </h4>
                <p className="text-sm sm:text-base font-semibold text-[#172554] break-words">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyDetails;

