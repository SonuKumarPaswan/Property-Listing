"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";

/**
 * ANIMATION VARIANTS (Matches About Us Page)
 */
const subtleFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

/**
 * REUSABLE UI COMPONENTS
 */
function PillBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
      <span>{text}</span>
    </div>
  );
}

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
    icon: <HiMiniBuildingOffice2 size={32} />,
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section className="relative py-16 sm:py-20 lg:py-24 bg-white text-[#172554] overflow-hidden antialiased">
        {/* Subtle Ambient Decorative Shape */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#2043B0]/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={subtleFadeUp}
            className="max-w-3xl mx-auto text-center mb-14 sm:mb-16"
          >
            <PillBadge text="Comprehensive Services" />

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-tight">
              Services Provide <span className="text-[#2043B0]">For You</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
              Discover premium property services designed to match your lifestyle
              needs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={index * 0.06}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-7 sm:p-8 shadow-xs hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-300 flex flex-col items-center text-center justify-between"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center mb-6 text-[#2043B0] group-hover:bg-[#2043B0] group-hover:text-white transition-all duration-300 shadow-xs text-3xl">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#172554] mb-3 group-hover:text-[#2043B0] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Learn More Button */}
                <div className="mt-auto pt-4 border-t border-[#E5E7EB]/60 w-full flex justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2043B0] group-hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesProvider;