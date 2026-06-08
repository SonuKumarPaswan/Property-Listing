"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const FeaturedProperty = () => {
  const [activeTab, setActiveTab] = useState("All");

  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs = ["All", "Apartments", "Villas", "Lands"];

  const properties = [
    {
      title: "Luxury Apartment",
      slug: "luxury-apartment",
      category: "Apartments",
      location: "Cleveland, United States",
      price: "₹2,12,120",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
    },
    {
      title: "Green Apartment",
      slug: "green-apartment",
      category: "Apartments",
      location: "Cleveland, United States",
      price: "₹2,32,120",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
    },
    {
      title: "Modern Villa",
      slug: "modern-villa",
      category: "Villas",
      location: "Miami, United States",
      price: "₹4,62,120",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
    },
    {
      title: "Luxury Villa",
      slug: "luxury-villa",
      category: "Villas",
      location: "Los Angeles, United States",
      price: "₹5,12,120",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img1.jpg",
    },
    {
      title: "Premium Land",
      slug: "premium-land",
      category: "Lands",
      location: "Texas, United States",
      price: "₹1,82,120",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
    },
    {
      title: "Investment Land",
      slug: "investment-land",
      category: "Lands",
      location: "Arizona, United States",
      price: "₹2,42,120",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
    },
  ];

  const filteredProperties =
    activeTab === "All"
      ? properties
      : properties.filter(
          (property) => property.category === activeTab
        );

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            Featured Property
          </h1>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Find your suitable house here and stay safe and relax with pleasure
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600"
          >
            <SlArrowLeft />
          </button>

          <button
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600"
          >
            <SlArrowRight />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-xl w-fit mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg transition-all ${
              activeTab === tab
                ? "bg-red-500 text-white"
                : "text-gray-700 hover:bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide overflow-x-hidden"
      >
        {filteredProperties.map((property, index) => (
          <Link
            key={index}
            href={`/properties/${property.slug}`}
            className="min-w-[340px] flex-shrink-0"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-200">
              <div className="overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {property.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500">
                  <span>📍</span>
                  <span>{property.location}</span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {property.price}
                    </p>
                  </div>

                  <div className="w-12 h-12 bg-blue-800 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-all">
                    →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperty;