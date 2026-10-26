"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ShieldCheck, Users, Sparkles, Clock } from "lucide-react";

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

const features = [
  "Verified Properties",
  "Trusted Agents",
  "Best Prices",
  "24/7 Support",
];

const featureIcons: Record<string, React.ElementType> = {
  "Verified Properties": ShieldCheck,
  "Trusted Agents": Users,
  "Best Prices": Sparkles,
  "24/7 Support": Clock,
};

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section className="relative py-16 sm:py-20 lg:py-24 bg-white text-[#172554] overflow-hidden antialiased">
        {/* Subtle Ambient Decorative Shape */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[320px] w-[600px] rounded-full bg-[#2043B0]/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={subtleFadeUp}
            className="max-w-2xl mx-auto text-center mb-12 sm:mb-14"
          >
            <PillBadge text="The Mishti Difference" />

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-tight">
              Why Choose <span className="text-[#2043B0]">Us</span>
            </h2>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((item, index) => {
              const Icon = featureIcons[item] || ShieldCheck;

              return (
                <motion.div
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={index * 0.08}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group rounded-2xl border border-[#E5E7EB] bg-white p-7 sm:p-8 text-center shadow-xs hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100/70 border border-blue-200/50 text-[#2043B0] transition-all duration-300 group-hover:bg-[#2043B0] group-hover:text-white shadow-xs">
                    <Icon className="h-7 w-7 transition-colors duration-300" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] group-hover:text-[#2043B0] transition-colors leading-snug">
                    {item}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}