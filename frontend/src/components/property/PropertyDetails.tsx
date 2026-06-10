"use client";

import {useState} from "react";



const PropertyDetails = ({property}: { property: any }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    {id: "description", label: "Description"},
    {id: "details", label: "Details"},
    {id: "amenities", label: "Amenities"},
    {id: "location", label: "Location"},
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6">
        {property?.title || "Premium 3 BHK Apartment"}
      </h2>

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 text-gray-900 ">
        <div className="hover:shadow-md p-3 border">
          <h4 className="text-gray-800 text-lg">Bedrooms</h4>
          <p className="text-2xl font-semibold mt-3">
            {property?.details?.bedrooms || 3}
          </p>
        </div>
        <div className="hover:shadow-lg p-3 border">
          <h4 className="text-gray-800 text-lg">Bathrooms</h4>
          <p className="text-2xl font-semibold mt-3">
            {property?.details?.bathrooms || 2}
          </p>
        </div>
        <div className="hover:shadow-lg p-3 border">
          <h4 className="text-gray-800 text-lg">Area</h4>
          <p className="text-2xl font-semibold mt-3">
            {property?.details?.area || 1800}{" "}
            {property?.details?.areaUnit || "sqft"}
          </p>
        </div>
        <div className="hover:shadow-lg p-3 border">
          <h4 className="text-gray-800 text-lg">Parking</h4>
          <p className="text-2xl font-semibold mt-3">
            {property?.details?.parking ? "Available" : "Not Available"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 text-lg font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-blue-600 text-white bg-blue-600 rounded-tr-3xl shadow"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "description" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Property Description
            </h3>

            <p className="text-gray-600 leading-8 text-[16px]">
              {property?.description ||
                "Experience modern living in this beautifully designed property located in a prime area. The home features spacious rooms, abundant natural light, premium interiors, and thoughtfully planned layouts to provide maximum comfort. With excellent connectivity to schools, hospitals, shopping centers, metro stations, and major business hubs, this property offers the perfect combination of convenience and luxury for families and professionals alike."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Property Highlights
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Prime Location</li>
                <li>• Spacious Living Areas</li>
                <li>• Modern Architecture</li>
                <li>• Premium Interior Finishes</li>
              </ul>
            </div>

            <div className="bg-gray-50 border rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Nearby Facilities
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Schools & Colleges</li>
                <li>• Hospitals & Clinics</li>
                <li>• Shopping Malls</li>
                <li>• Metro & Public Transport</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "details" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(property?.details || {}).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between border p-4 rounded-lg bg-gray-50 hover:shadow-lg"
            >
              <span className="capitalize text-gray-600">{key}</span>
              {/* <span className="font-medium">{value}</span> */}
            </div>
          ))}
        </div>
      )}

      {activeTab === "amenities" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-black">
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
              className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl hover:shadow-lg border"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="capitalize">{amenity.replace("_", " ")}</span>
            </div>
          ))}
        </div>
      )}
      {activeTab === "location" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          <div className="bg-gray-50 p-4 rounded-xl border">
            <h4 className="font-semibold text-gray-700">Address</h4>
            <p>{property?.address || "C-127, Sector 63, Noida"}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border">
            <h4 className="font-semibold text-gray-700">City</h4>
            <p>{property?.city || "Noida"}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border">
            <h4 className="font-semibold text-gray-700">State</h4>
            <p>{property?.state || "Uttar Pradesh"}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border">
            <h4 className="font-semibold text-gray-700">Pincode</h4>
            <p>{property?.pincode || "201301"}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border">
            <h4 className="font-semibold text-gray-700">Nearby Metro</h4>
            <p>{property?.metro || "Sector 62 Metro Station"}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border">
            <h4 className="font-semibold text-gray-700">Landmark</h4>
            <p>{property?.landmark || "Fortis Hospital"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
