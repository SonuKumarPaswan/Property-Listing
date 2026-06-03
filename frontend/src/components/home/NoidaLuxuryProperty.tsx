"use client";

import React from "react";
import { FaMapMarkerAlt, FaBuilding, FaRupeeSign } from "react-icons/fa";

const properties = [
  {
    id: 1,
    title: "Luxury Office Space",
    location: "Sector 62, Noida",
    price: "₹1.25 Cr",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    id: 2,
    title: "Premium Commercial Hub",
    location: "Sector 18, Noida",
    price: "₹2.10 Cr",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  },
  {
    id: 3,
    title: "Corporate Business Center",
    location: "Noida Extension",
    price: "₹95 Lakh",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118",
  },
];

const NoidaLuxuryProperty = () => {
  return (
    <section className="py-10">
      <div className="px-4">
        {/* Heading */}
        <div className="text-start mb-14">
          <span className="text-blue-400 uppercase tracking-widest">
            Premium Collection
          </span>

          <h2 className="text-5xl font-bold text-black mt-4">
            Noida Luxury Properties
          </h2>

          <p className="text-gray-400 mt-4  mx-auto">
            Discover premium office spaces, luxury apartments, and commercial
            properties in the most sought-after locations across Noida.
          </p>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <FaMapMarkerAlt />
                  <span>{property.location}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {property.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
                    <FaRupeeSign />
                    <span>{property.price}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaBuilding />
                    <span>Luxury</span>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoidaLuxuryProperty;