"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const properties = [
  {
    id: 1,
    slug: "premium-office-space",
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
    slug: "luxury-apartment",
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
    slug: "commercial-property",
    title: "Commercial Property",
    location: "Noida Extension",
    price: "₹2.10 Cr",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    beds: 5,
    baths: 4,
  },
  {
    id: 4,
    slug: "business-tower",
    title: "Business Tower",
    location: "Sector 137, Noida",
    price: "₹1.80 Cr",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
    beds: 4,
    baths: 3,
  },
  {
    id: 5,
    slug: "corporate-hub",
    title: "Corporate Hub",
    location: "Sector 142, Noida",
    price: "₹2.45 Cr",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118",
    beds: 6,
    baths: 4,
  },
];

const RecentSearchProperty = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-4 px-4 md:px-10 lg:px-10 bg-gray-50">
      <div >
        {/* Heading + Arrows */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-black">
              Recent Search Properties
            </h2>

            <p className="text-gray-500 mt-3">
              Explore recently searched premium properties.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700"
            >
              <SlArrowLeft />
            </button>

            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700"
            >
              <SlArrowRight />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide overflow-x-hidden"
        >
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className="min-w-[320px] max-w-[320px] flex-shrink-0"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg  ">
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>{property.location}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <h4 className="text-2xl font-bold text-blue-600">
                      {property.price}
                    </h4>

                    <span className="px-4 py-2 bg-slate-900 text-white rounded-lg group-hover:bg-blue-600 transition">
                      View
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSearchProperty;