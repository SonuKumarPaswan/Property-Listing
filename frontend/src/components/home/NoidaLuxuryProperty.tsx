"use client";

import Link from "next/link";
import {useRef} from "react";
import {SlArrowLeft} from "react-icons/sl";
import {SlArrowRight} from "react-icons/sl";

const properties = [
  {
    id: 1,
    title: "Luxury Office Space",
    slug: "luxury-office-space",
    location: "Sector 62, Noida",
    price: "₹ 1.25 Cr",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  },
  {
    id: 2,
    title: "Premium Commercial Hub",
    slug: "premium-commercial-hub",
    location: "Sector 18, Noida",
    price: "₹ 2.10 Cr",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  },
  {
    id: 3,
    title: "Corporate Business Center",
    slug: "corporate-business-center",
    location: "Noida Extension",
    price: "₹ 95 Lakh",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
  },
  {
    id: 3,
    title: "Corporate Business Center",
    slug: "corporate-business-center",
    location: "Noida Extension",
    price: "₹ 95 Lakh",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118",
  },
  {
    id: 4,
    title: "Business Tower",
    slug: "business-tower",
    location: "Sector 137, Noida",
    price: "₹ 1.50 Cr",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
  },
  {
    id: 4,
    title: "Business Tower",
    slug: "business-tower",
    location: "Sector 137, Noida",
    price: "₹ 1.50 Cr",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
  },
  {
    id: 5,
    title: "Skyline Corporate Plaza",
    slug: "skyline-corporate-plaza",
    location: "Sector 142, Noida",
    price: "₹ 1.85 Cr",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  },
];

const NoidaLuxuryProperty = () => {
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
    <section className="py-10 bg-gray-50">
      <div className="px-8 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-5xl font-bold text-black">
            Noida Luxury Properties
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <SlArrowLeft size={20} />
            </button>

            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-gray-300 text-gray-500 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <SlArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-2 overflow-x-hidden"
        >
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              className="group min-w-[320px] flex-shrink-0"
            >
              <div className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {property.title}
                  </h3>

                  <p className="text-blue-600 font-semibold mb-2">
                    {property.price}
                  </p>

                  <p className="text-gray-500 text-sm">{property.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoidaLuxuryProperty;
