"use client";

import React from "react";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";

const properties = [
  {
    id: 1,
    title: "Premium Office Space",
    location: "Sector 62, Noida",
    price: "₹1.25 Cr",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    beds: 3,
    baths: 2,
  },
  {
    id: 2,
    title: "Luxury Apartment",
    location: "Greater Noida",
    price: "₹85 Lakh",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    beds: 4,
    baths: 3,
  },
  {
    id: 3,
    title: "Commercial Property",
    location: "Noida Extension",
    price: "₹2.10 Cr",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    beds: 5,
    baths: 4,
  },
];

const RecentSearchProperty = () => {
  return (
    <section className="py-10 ">
      <div className=" px-4">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-black">
            Recent Search Properties
          </h2>

          <p className="text-gray-400 mt-3">
            Explore recently searched premium properties.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h3 className="text-2xl font-semibold text-slate-900">
                  {property.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 mt-2">
                  <FaMapMarkerAlt />
                  <span>{property.location}</span>
                </div>

                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBed />
                    <span>{property.beds} Beds</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBath />
                    <span>{property.baths} Baths</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <h4 className="text-3xl font-bold text-blue-600">
                    {property.price}
                  </h4>

                  <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600 transition">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSearchProperty;