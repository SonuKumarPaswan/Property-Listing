"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (Matches About Us Page)
───────────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────────
   REUSABLE UI COMPONENTS (White & Blue Palette)
───────────────────────────────────────────────────────────────────────────── */
function PillBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
      <span>{text}</span>
    </div>
  );
}

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
      left: -380,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 380,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-white text-[#172554] overflow-hidden antialiased">
        {/* Subtle Ambient Decorative Glow */}
        <div className="pointer-events-none absolute right-1/4 top-0 h-[350px] w-[550px] rounded-full bg-[#2043B0]/5 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={subtleFadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12"
          >
            <div className="max-w-2xl">
              <PillBadge text="Recent Searches" />
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight">
                Recent Search <span className="text-[#2043B0]">Properties</span>
              </h2>
              <p className="mt-3.5 text-base sm:text-lg text-[#4B5563] leading-relaxed font-sans">
                Explore recently searched premium properties.
              </p>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Scroll properties left"
                className="h-11 w-11 rounded-full border border-[#E5E7EB] bg-white text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                aria-label="Scroll properties right"
                className="h-11 w-11 rounded-full border border-[#E5E7EB] bg-white text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Property Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={index * 0.08}
                className="shrink-0"
              >
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block w-[290px] sm:w-[340px] md:w-[360px] h-[430px] sm:h-[450px] focus:outline-none"
                >
                  <div className="h-full flex flex-col bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    {/* Image Wrapper */}
                    <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-blue-50/50">
                      <img
                        src={property.image}
                        alt={property.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] group-hover:text-[#2043B0] transition-colors duration-200 line-clamp-1">
                          {property.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-[#4B5563] mt-2.5 font-sans">
                          <MapPin className="h-4 w-4 text-[#2043B0] shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>

                      {/* Price & View Action */}
                      <div className="mt-6 pt-4 border-t border-[#E5E7EB]/80 flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#2043B0]">
                          {property.price}
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2043B0] text-white text-xs sm:text-sm font-semibold shadow-xs group-hover:bg-blue-700 transition-colors duration-200">
                          View
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentSearchProperty;