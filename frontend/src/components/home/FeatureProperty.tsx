import React, { useState } from "react";

const FeaturedProperty = () => {
  const [activeTab, setActiveTab] = useState("Lands");

  const tabs = ["All", "Apartments", "Villas", "Lands"];

  const properties = [
    {
      title: "Luxury Apartment",
      location: "Cleveland, United States",
      price: "₹2,12,120",
      image: "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
    },
    {
      title: "Green Apartment",
      location: "Cleveland, United States",
      price: "₹2,32,120",
      image: "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
    },
    {
      title: "Green Apartment",
      location: "Cleveland, United States",
      price: "₹2,62,120",
      image: "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
    },
    {
      title: "Green Apartment",
      location: "Cleveland, United States",
      price: "₹2,62,120",
      image: "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
    },
    {
      title: "Green Apartment",
      location: "Cleveland, United States",
      price: "₹2,62,120",
      image: "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
    },
  ];

  return (
    <div className="bg-white px-6 ">
    
      <div className="flex justify-between items-start mb-8 px-4">
        <div>
          <h1 className="text-black text-3xl font-bold flex items-center gap-2">
            Featured Property
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Find your suitable house here and stay safe and relax with pleasure
          </p>
        </div>

      
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded font-medium transition-all ${
                activeTab === tab
                  ? "bg-red-500 text-white shadow-sm"
                  : "text-gray-700 hover:bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <div
            key={index}
            className="bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-blue-300"
          >
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <span>📍</span>
                <span className="text-sm">{property.location}</span>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {property.price}
                  </p>
                </div>

                <button className="bg-blue-800 hover:bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
                  View Details
                  <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperty;