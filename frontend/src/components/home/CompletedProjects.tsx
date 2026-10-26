"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion, Variants } from "framer-motion";
import {
  FaBuildingShield,
  FaIdCard,
  FaMedal,
  FaFaceSmile as FaSmile,
} from "react-icons/fa6";

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

const stats = [
  {
    icon: <FaSmile />,
    value: 96,
    suffix: "K+",
    progress: 96,
    title: "Happy Clients",
  },
  {
    icon: <FaIdCard />,
    value: 362,
    suffix: "K",
    progress: 85,
    title: "Customer Ratings",
  },
  {
    icon: <FaBuildingShield />,
    value: 69,
    suffix: "K+",
    progress: 75,
    title: "Projects Delivered",
  },
  {
    icon: <FaMedal />,
    value: 236,
    suffix: "+",
    progress: 90,
    title: "Business Awards",
  },
];

const CompletedProjects = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section
        ref={ref}
        className="relative py-16 sm:py-20 lg:py-24 bg-white text-[#172554] overflow-hidden antialiased"
      >
        {/* Subtle Ambient Decorative Shape */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#2043B0]/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={subtleFadeUp}
            className="text-center mb-14 sm:mb-16 max-w-3xl mx-auto"
          >
            <PillBadge text="Our Achievements" />

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-tight">
              Numbers That <span className="text-[#2043B0]">Define Us</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
              Delivering excellence in real estate with trusted service,
              successful projects, and thousands of satisfied clients.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={index * 0.08}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-7 sm:p-8 text-center shadow-xs hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center text-3xl text-[#2043B0] mb-6 group-hover:bg-[#2043B0] group-hover:text-white transition-all duration-300 shadow-xs">
                    {item.icon}
                  </div>

                  {/* Counter */}
                  <h3 className="text-4xl sm:text-5xl font-[Cinzel] font-bold text-[#2043B0] mb-2 tracking-tight">
                    {inView && (
                      <CountUp
                        start={0}
                        end={item.value}
                        duration={3}
                        suffix={item.suffix}
                      />
                    )}
                  </h3>

                  {/* Title */}
                  <p className="text-[#172554] font-semibold text-base sm:text-lg mb-6">
                    {item.title}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-auto pt-4 border-t border-[#E5E7EB]/60">
                  <div className="h-2 bg-[#F5F7FF] border border-blue-100/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2043B0] rounded-full transition-all ease-out duration-[3000ms]"
                      style={{
                        width: inView ? `${item.progress}%` : "0%",
                      }}
                    />
                  </div>

                  <div className="flex justify-end mt-2">
                    <span className="text-xs font-bold text-[#2043B0]">
                      {item.progress}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CompletedProjects;