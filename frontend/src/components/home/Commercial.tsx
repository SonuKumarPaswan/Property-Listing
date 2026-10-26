"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Building2,
  Briefcase,
  Landmark,
  ArrowRight,
} from "lucide-react";

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
 * REUSABLE UI COMPONENTS (White & Blue Palette)
 */
function PillBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
      <span>{text}</span>
    </div>
  );
}

const commercialFeatures = [
  {
    icon: Building2,
    title: "Office Spaces",
    description:
      "Premium office spaces designed for productivity, growth, and modern business operations.",
  },
  {
    icon: Briefcase,
    title: "Retail Properties",
    description:
      "High-visibility retail locations in prime commercial zones for maximum customer reach.",
  },
  {
    icon: Landmark,
    title: "Commercial Suites",
    description:
      "Well-designed commercial suites that combine functionality, convenience, and a professional atmosphere for business success.",
  },
];

export default function Commercial() {
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
            <PillBadge text="Commercial Properties" />

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-tight">
              Commercial Real Estate
              <br className="hidden sm:inline" />{" "}
              And <span className="text-[#2043B0]">Office Spaces</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
              Discover premium commercial properties tailored for offices,
              retail stores, startups, and investment opportunities across
              strategic business locations.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {commercialFeatures.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={index * 0.1}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group rounded-2xl border border-[#E5E7EB] bg-white p-7 sm:p-8 shadow-xs hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-blue-100/70 border border-blue-200/50 flex items-center justify-center mb-6 text-[#2043B0] group-hover:bg-[#2043B0] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-7 h-7 transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#172554] mb-3 group-hover:text-[#2043B0] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E5E7EB]/60">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#2043B0] group-hover:text-blue-700 transition-colors cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={subtleFadeUp}
            custom={0.3}
            className="mt-14 sm:mt-16 text-center"
          >
            <button
              type="button"
              className="bg-[#2043B0] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold text-base shadow-sm shadow-blue-900/20 hover:shadow-md transition-all duration-300 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}