"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Building2, Users, ShieldCheck, MapPin } from "lucide-react";

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

const stats = [
  { title: "Properties", value: "5000+", icon: Building2 },
  { title: "Clients", value: "2000+", icon: Users },
  { title: "Agents", value: "150+", icon: ShieldCheck },
  { title: "Cities", value: "25+", icon: MapPin },
];

export default function Stats() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section className="relative border-y border-[#E5E7EB] bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-[#172554] antialiased">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={index * 0.08}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col items-center text-center p-6 sm:p-7 rounded-2xl border border-[#E5E7EB] bg-[#F5F7FF] shadow-xs hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-300"
              >
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2043B0]">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="text-3xl sm:text-4xl font-[Cinzel] font-bold text-[#2043B0] tracking-tight">
                  {item.value}
                </span>

                <span className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#172554]">
                  {item.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}