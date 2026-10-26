"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
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

interface NoidaOfficeData {
  title?: string;
  location?: string;
  price?: string;
  image?: string;
  slug?: string;
}

const NoidaOffice = () => {
  const [data, setData] = useState<NoidaOfficeData[]>([]);
  const [loading, setLoading] = useState(true);

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

  const fetchNoidaOffice = async () => {
    try {
      setData([
        {
          title: "Luxury Office Space",
          slug: "luxury-office-space",
          location: "Sector 62, Noida",
          price: "₹1,25,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
        },
        {
          title: "Corporate Workspace",
          slug: "corporate-workspace",
          location: "Sector 18, Noida",
          price: "₹95,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
        },
        {
          title: "Premium Office",
          slug: "premium-office",
          location: "Sector 132, Noida",
          price: "₹2,10,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img1.jpg",
        },
        {
          title: "Business Hub",
          slug: "business-hub",
          location: "Sector 137, Noida",
          price: "₹1,45,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
        },
        {
          title: "Corporate Tower",
          slug: "corporate-tower",
          location: "Noida Extension",
          price: "₹1,85,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch office data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoidaOffice();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-3 bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#2043B0] border-t-transparent" />
        <p className="text-sm font-semibold text-[#4B5563] tracking-wide">
          Loading office spaces...
        </p>
      </div>
    );
  }

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
              <PillBadge text="Workspace Solutions" />

              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight">
                Featured Office <span className="text-[#2043B0]">Spaces</span>
              </h2>

              <p className="mt-3 text-base sm:text-lg text-[#4B5563] leading-relaxed">
                Explore our premium office spaces in Noida, designed for modern businesses.
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
                aria-label="Previous office spaces"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next office spaces"
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════
              OFFICE SLIDER
          ══════════════════════════════════════════ */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar py-2 -my-2 px-1 -mx-1"
          >
            {data.map((office, index) => (
              <motion.div
                key={office.slug || index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={index * 0.08}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-[320px] sm:w-[360px] md:w-[380px] flex-shrink-0"
              >
                <Link
                  href={`/properties/${office.slug}`}
                  className="group block h-[380px] sm:h-[400px] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20 relative flex items-end"
                >
                  {/* Background Image Container with Smooth Hover Zoom */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${office.image})`,
                    }}
                  />

                  {/* Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-white/95 px-3 py-1 text-xs font-semibold text-[#2043B0] shadow-xs backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                    <span>Office Space</span>
                  </div>

                  {/* Bottom-Left Information Panel */}
                  <div className="relative z-10 w-[88%] bg-white/95 backdrop-blur-md rounded-tr-3xl border-t border-r border-[#E5E7EB] p-5 sm:p-6 shadow-sm">
                    <h3 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] transition-colors duration-200 group-hover:text-[#2043B0] line-clamp-1 mb-1">
                      {office.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#4B5563] mb-3">
                      <MapPin className="h-3.5 w-3.5 text-[#2043B0] shrink-0" />
                      <span className="truncate">{office.location}</span>
                    </div>

                    <div className="border-t border-[#E5E7EB] pt-3 flex items-center justify-between">
                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
                          Price
                        </span>
                        <span className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#2043B0]">
                          {office.price}
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

export default NoidaOffice;
