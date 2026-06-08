"use client";

import React from "react";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Office Space",
    description:
      "Premium office spaces tailored for startups, SMEs, and enterprises.",
    icon: "🏢",
  },
  {
    title: "Commercial Property",
    description:
      "Explore premium commercial properties in prime business locations.",
    icon: "🏬",
  },
  {
    title: "Workspace Solutions",
    description:
      "Flexible co-working and managed workspace solutions for businesses.",
    icon: <HiMiniBuildingOffice2 size={40} />,
  },
  {
    title: "Property Leasing",
    description:
      "Hassle-free leasing services for offices, retail shops, and commercial spaces.",
    icon: "📑",
  },
  {
    title: "Facility Management",
    description:
      "Complete facility management with maintenance and vendor support.",
    icon: "🛠️",
  },
  {
    title: "Property Investment",
    description:
      "Expert guidance for high-return commercial property investments.",
    icon: "📈",
  },
  {
    title: "Property Consultation",
    description:
      "Professional consultation to help you find the right property solution.",
    icon: "💼",
  },
  {
    title: "Parking Solutions",
    description:
      "Secure and convenient parking facilities for employees and visitors.",
    icon: "🚗",
  },
  {
    title: "24/7 Security",
    description:
      "Round-the-clock security services for complete peace of mind.",
    icon: "🛡️",
  },
];

const ServicesProvider: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-[#08131b] mb-4">
            Services Provide For You
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium property services designed to match your lifestyle
            needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-gray-200 hover:border-blue-500 rounded-xl p-7 min-h-[320px] flex flex-col items-center text-center transition-all duration-300 shadow-[4px_4px_0px_0px_#000] hover:shadow-[-4px_4px_0px_0px_#2563eb] hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-4xl">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8 max-w-[240px]">
                {service.description}
              </p>

              {/* Learn More */}
              <button className="mt-auto font-medium text-gray-900 inline-flex items-center gap-2 group-hover:text-blue-600 transition-all">
                Learn More
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesProvider;