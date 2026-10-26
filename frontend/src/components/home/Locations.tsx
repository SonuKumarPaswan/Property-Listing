"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MapPin } from "lucide-react";

/**
 * ANIMATION VARIANTS
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
 *  REUSABLE UI COMPONENTS
 */
function PillBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
      <span>{text}</span>
    </div>
  );
}

const locations = [
  "Noida",
  "Greater Noida",
  "Delhi",
  "Gurgaon",
  "Ghaziabad",
];

export default function Locations() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section className="bg-white py-16 sm:py-20 lg:py-24 text-[#172554] antialiased">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ══════════════════════════════════════════
              HEADER
          ══════════════════════════════════════════ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={subtleFadeUp}
            className="mb-12 text-center max-w-2xl mx-auto"
          >
            <PillBadge text="Prime Destinations" />

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight">
              Popular <span className="text-[#2043B0]">Locations</span>
            </h2>

            <p className="mt-3 text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Explore premier properties across key metropolitan regions and commercial hubs
            </p>
          </motion.div>

          {/* ══════════════════════════════════════════
              LOCATIONS GRID / WRAP
          ══════════════════════════════════════════ */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 max-w-4xl mx-auto">
            {locations.map((location, index) => (
              <motion.div
                key={location}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={index * 0.08}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group cursor-pointer rounded-2xl border border-[#E5E7EB] bg-white px-7 py-4 sm:py-5 shadow-xs transition-all duration-300 hover:border-blue-300 hover:bg-[#F5F7FF] hover:shadow-md hover:shadow-blue-900/5 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20 flex items-center gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FF] text-[#2043B0] transition-colors duration-300 group-hover:bg-[#2043B0] group-hover:text-white border border-blue-100">
                  <MapPin className="h-4 w-4" />
                </div>

                <span className="text-base sm:text-lg font-semibold text-[#172554] transition-colors duration-300 group-hover:text-[#2043B0]">
                  {location}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}