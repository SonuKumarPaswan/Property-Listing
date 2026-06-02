import React from "react";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Bed Rooms",
    description: "Comfortable and stylish rooms designed for modern living.",
    icon: "🏠",
  },
  {
    title: "Workspace Solutions",
    description: "Co-working space arrangements",
    icon: <HiMiniBuildingOffice2 size={50} />,
  },
  {
    title: "Facility Management Services",
    description: "Dedicated facility management with vendor coordination.",
    icon: "🛠️",
  },
  {
    title: "Modern Kitchen",
    description: "Elegant kitchen spaces with smart and practical design.",
    icon: "🍳",
  },
  {
    title: "Parking Space",
    description: "Safe and convenient parking for residents and visitors.",
    icon: "🚗",
  },
  {
    title: "24/7 Security",
    description: "Reliable security service for complete peace of mind.",
    icon: "🛡️",
  },
];

const ServicesProvider: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#08131b] mb-4">
          Services Provide For You
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          Discover premium property services designed to match your lifestyle needs.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border-2 hover:border-blue-400 rounded-lg p-12 flex flex-col items-center justify-center shadow-[4px_2px_0_0_#000] hover:shadow-[4px_2px_0_0_#1e88e3] hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Icon */}
              <div className="w-[110px] h-[110px] bg-blue-50 text-[#1e88e5] rounded-2xl flex items-center justify-center mb-8 text-5xl">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-semibold text-gray-900 mb-5">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[18px] text-gray-600 leading-relaxed mb-10 text-center max-w-[280px]">
                {service.description}
              </p>

              {/* Learn More */}
              <a
                href="#"
                className="text-lg font-medium text-gray-900 inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                Learn More
                <span className="text-2xl">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesProvider;