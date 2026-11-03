"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-3.5 sm:px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
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
      location: "Sector 150, Noida, Uttar Pradesh",
      price: "₹60,000",
      image:
        "https://res.cloudinary.com/c3e6qxy4/image/upload/v1793076260/WhatsApp_Image_2026-10-26_at_5.48.35_PM_2.jpg",
    },
    {
      title: "Green Apartment",
      slug: "green-apartment",
      category: "Apartments",
      location: "Sector 16B, Greater Noida West, Uttar Pradesh",
      price: "₹55,000",
      image:
        "https://res.cloudinary.com/c3e6qxy4/image/upload/v1793076257/WhatsApp_Image_2026-10-26_at_5.48.21_PM_1.jpg",
    },
    {
      title: "Modern Villa",
      slug: "modern-villa",
      category: "Villas",
      location: "Sector 150, Noida, Uttar Pradesh",
      price: "₹60,000",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
    },
    {
      title: "Luxury Villa",
      slug: "luxury-villa",
      category: "Villas",
      location: "Sector Omega 1, Greater Noida, Uttar Pradesh",
      price: "₹58,000",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img1.jpg",
    },
    {
      title: "Premium Land",
      slug: "premium-land",
      category: "Lands",
      location: "Sector 150, Noida, Uttar Pradesh",
      price: "₹52,000",
      image:
        "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
    },
    {
      title: "Investment Land",
      slug: "investment-land",
      category: "Lands",
      location: "Yamuna Expressway, Greater Noida, Uttar Pradesh",
      price: "₹50,000",
      image:
        "https://res.cloudinary.com/c3e6qxy4/image/upload/v1793076258/WhatsApp_Image_2026-10-26_at_5.48.27_PM_2.jpg",
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

  const getScrollAmount = () => {
    if (!scrollRef.current) return 380;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap =
        typeof window !== "undefined" && window.innerWidth >= 640 ? 24 : 16;
      return cardWidth + gap;
    }
    return 380;
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
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

      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 text-[#172554] antialiased overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* ══════════════════════════════════════════
              HEADER & NAVIGATION CONTROLS
          ══════════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={subtleFadeUp}
              className="max-w-2xl min-w-0"
            >
              <PillBadge text="Exclusive Listings" />

              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Cinzel] font-bold tracking-tight
               text-[#172554] leading-tight break-words">
                Featured <span className="text-[#2043B0]">Property</span>
              </h2>

              <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-[#4B5563] leading-relaxed break-words">
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
              className="flex items-center gap-2.5 sm:gap-3 self-end md:self-end shrink-0"
            >
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous properties"
                className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2043B0]/30"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next properties"
                className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2043B0]/30"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════
              CATEGORY TABS (Scrollable on small screens)
          ══════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={subtleFadeUp}
            custom={0.15}
            className="mb-6 sm:mb-8 overflow-x-auto hide-scrollbar touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-blue-100 bg-[#F5F7FF] p-1 sm:p-1.5 shadow-xs shrink-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className={`rounded-lg px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${isActive
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
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth hide-scrollbar snap-x snap-mandatory py-3 -my-3 px-1 -mx-1 touch-pan-x"
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
                className="w-[84vw] max-w-[340px] min-w-[260px] sm:min-w-0 sm:w-[340px] md:w-[360px] lg:w-[370px] 
                xl:w-[380px] flex-shrink-0 snap-start"
              >
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block h-full rounded border border-[#E5E7EB] bg-white p-3
                   sm:p-4 shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20"
                >
                  {/* Property Image Container */}
                  <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden rounded bg-[#F5F7FF]">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Category Pill Tag */}
                    <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-white/95 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-[#2043B0] shadow-xs backdrop-blur-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                      <span>{property.category}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-3.5 sm:pt-4 pb-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-[Cinzel] font-bold text-[#172554]
                     transition-colors duration-200 group-hover:text-[#2043B0] truncate">
                      {property.title}
                    </h3>

                    <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-[#4B5563]">
                      <MapPin className="h-3.5 w-3.5 text-[#2043B0] shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </div>

                    {/* Divider */}
                    <div className="my-3 sm:my-4 border-t border-[#E5E7EB]" />

                    {/* Footer / Price & Navigation Indicator */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
                          Price
                        </span>
                        <span className="text-lg sm:text-xl md:text-2xl font-[Cinzel] font-bold text-[#2043B0] truncate block">
                          {property.price}
                        </span>
                      </div>

                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl bg-[#2043B0] text-white shadow-sm shadow-blue-900/20 transition-all duration-300 group-hover:bg-blue-700 group-hover:translate-x-0.5">
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
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
