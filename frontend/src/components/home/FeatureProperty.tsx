"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (Identical to About Us Page)
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
   REUSABLE UI COMPONENTS (White & Blue Palette from About Us Page)
───────────────────────────────────────────────────────────────────────────── */
function PillBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
      <span>{text}</span>
    </div>
  );
}

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
      : properties.filter((property) => property.category === activeTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

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
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <section className="bg-white py-16 sm:py-20 lg:py-24 text-[#172554] antialiased">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ══════════════════════════════════════════
              HEADER & NAVIGATION CONTROLS
          ══════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={subtleFadeUp}
              className="max-w-2xl"
            >
              <PillBadge text="Exclusive Listings" />

              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight">
                Featured <span className="text-[#2043B0]">Property</span>
              </h2>

              <p className="mt-3 text-base sm:text-lg text-[#4B5563] leading-relaxed">
                Find your suitable house here and stay safe and relax with pleasure
              </p>
            </motion.div>

            {/* Navigation Arrows */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={subtleFadeUp}
              custom={0.1}
              className="flex items-center gap-3 self-start md:self-end"
            >
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous properties"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next properties"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════
              CATEGORY TABS
          ══════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={subtleFadeUp}
            custom={0.15}
            className="mb-8 overflow-x-auto hide-scrollbar"
          >
            <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-[#F5F7FF] p-1.5 shadow-xs">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#2043B0] text-white shadow-sm shadow-blue-900/20"
                        : "text-[#172554] hover:bg-white hover:text-[#2043B0]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════
              PROPERTY SLIDER
          ══════════════════════════════════════════ */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar py-2 -my-2 px-1 -mx-1"
          >
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={index * 0.08}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-[300px] sm:w-[340px] md:w-[360px] flex-shrink-0"
              >
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block h-full rounded-2xl border border-[#E5E7EB] bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20"
                >
                  {/* Property Image Container */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden rounded-xl bg-[#F5F7FF]">
                    <img
                      src={property.image}
                      alt={property.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-white/95 px-3 py-1 text-xs font-semibold text-[#2043B0] shadow-xs backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                      <span>{property.category}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-4 pb-1">
                    <h3 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] transition-colors duration-200 group-hover:text-[#2043B0] line-clamp-1">
                      {property.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-[#4B5563]">
                      <MapPin className="h-3.5 w-3.5 text-[#2043B0] shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-[#E5E7EB]" />

                    {/* Footer / Price & Navigation Indicator */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
                          Price
                        </span>
                        <span className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#2043B0]">
                          {property.price}
                        </span>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2043B0] text-white shadow-sm shadow-blue-900/20 transition-all duration-300 group-hover:bg-blue-700 group-hover:translate-x-0.5">
                        <ArrowRight className="h-5 w-5" />
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

export default FeaturedProperty;