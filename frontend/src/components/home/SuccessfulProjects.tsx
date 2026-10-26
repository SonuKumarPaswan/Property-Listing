"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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

const projects = [
  {
    title: "Luxury Apartment Complex",
    slug: "luxury-apartment-complex",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
    description:
      "A state-of-the-art residential complex offering unparalleled amenities and breathtaking views.",
  },
  {
    title: "Modern Office Park",
    slug: "modern-office-park",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
    description:
      "A cutting-edge commercial space designed to foster innovation and collaboration.",
  },
  {
    title: "Eco-Friendly Housing Development",
    slug: "eco-friendly-housing-development",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img5.jpg",
    description:
      "A sustainable housing project that combines modern living with environmental responsibility.",
  },
  {
    title: "Business Hub",
    slug: "business-hub",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
    description:
      "Premium commercial hub built for growing businesses and startups.",
  },
  {
    title: "Corporate Tower",
    slug: "corporate-tower",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img1.jpg",
    description:
      "A modern business tower offering premium office spaces and facilities.",
  },
];

const SuccessfulProjects = () => {
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

      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-[#F5F7FF] border-y border-[#E5E7EB] text-[#172554] overflow-hidden antialiased">
        {/* Subtle Ambient Decorative Shape */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#2043B0]/5 blur-3xl" />

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
              <PillBadge text="Proven Portfolio" />
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight">
                Successful <span className="text-[#2043B0]">Projects</span>
              </h2>
              <p className="mt-3.5 text-base sm:text-lg text-[#4B5563] leading-relaxed font-sans">
                Discover our successful real estate projects that have transformed
                landscapes and created thriving communities.
              </p>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous projects"
                className="h-11 w-11 rounded-full border border-[#E5E7EB] bg-white text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next projects"
                className="h-11 w-11 rounded-full border border-[#E5E7EB] bg-white text-[#172554] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#2043B0]/20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Project Slider */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={index * 0.08}
                className="shrink-0"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block w-[290px] sm:w-[340px] md:w-[360px] h-[430px] sm:h-[450px] focus:outline-none"
                >
                  <div className="h-full flex flex-col bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    {/* Image Wrapper */}
                    <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-blue-50/50">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] group-hover:text-[#2043B0] transition-colors duration-200 line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="mt-2.5 text-sm text-[#4B5563] leading-relaxed line-clamp-3 font-sans">
                          {project.description.slice(0, 200)}
                        </p>
                      </div>

                      {/* View Project Action */}
                      <div className="mt-6 pt-4 border-t border-[#E5E7EB]/80 flex items-center justify-between text-sm font-semibold text-[#2043B0]">
                        <span>View Project</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
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

export default SuccessfulProjects;