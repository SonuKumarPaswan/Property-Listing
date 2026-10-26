"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

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

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Home Buyer",
    image:
      "https://res.cloudinary.com/jan6dcse/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
    review:
      "Mishti Spaces helped me find my dream home in Noida. The process was smooth and transparent.",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Property Investor",
    image:
      "https://res.cloudinary.com/jan6dcse/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
    review:
      "Excellent platform with verified properties and professional support. Highly recommended.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Commercial Buyer",
    image:
      "https://res.cloudinary.com/jan6dcse/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
    review:
      "Found the perfect office space through Mishti Spaces. Great customer service and guidance.",
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Luxury Home Owner",
    image:
      "https://res.cloudinary.com/jan6dcse/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
    review:
      "Beautiful listings and genuine property details. My experience was fantastic.",
  },
  {
    id: 5,
    name: "Vikash Gupta",
    role: "Real Estate Investor",
    image:
      "https://res.cloudinary.com/jan6dcse/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
    review:
      "The team guided me through every step of the investment process. Very professional.",
  },
];

export default function CustomersSaying() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section className="relative py-16 sm:py-20 lg:py-24 bg-white text-[#172554] overflow-hidden antialiased">
        {/* Subtle Ambient Decorative Shape */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#2043B0]/5 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={subtleFadeUp}
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-14"
          >
            <PillBadge text="Testimonials" />

            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-tight">
              What Our Customers <span className="text-[#2043B0]">Say</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
              Trusted by property buyers, investors, and businesses across Noida
              for seamless real estate solutions.
            </p>
          </motion.div>

          {/* Slider Container */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={subtleFadeUp}
            custom={0.15}
            className="relative"
          >
            {/* Slider Track */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {testimonials.map((item) => (
                  <div key={item.id} className="min-w-full px-2 sm:px-4">
                    <div className="relative bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-300 p-7 sm:p-10 md:p-12">
                      {/* Quote Icon */}
                      <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 h-12 w-12 sm:h-16 sm:w-16 text-blue-100/80 -rotate-12 pointer-events-none" />

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-5 sm:mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Review */}
                      <p className="text-[#4B5563] text-base sm:text-lg md:text-xl leading-relaxed italic mb-8 max-w-3xl">
                        &ldquo;{item.review}&rdquo;
                      </p>

                      {/* User */}
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-200/80 shadow-xs"
                        />

                        <div>
                          <h3 className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554]">
                            {item.name}
                          </h3>

                          <p className="text-xs sm:text-sm font-semibold text-[#2043B0] tracking-wide">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Left Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 md:-left-6 bg-white shadow-xs hover:shadow-md border border-[#E5E7EB] rounded-full w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center text-[#172554] hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer z-20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 md:-right-6 bg-white shadow-xs hover:shadow-md border border-[#E5E7EB] rounded-full w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center text-[#172554] hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-300 active:scale-95 cursor-pointer z-20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center gap-2.5 mt-8 sm:mt-10">
            {testimonials.map((_, index) => {
              const isActive = currentIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#2043B0] w-8 sm:w-10 shadow-xs"
                      : "bg-[#E5E7EB] hover:bg-blue-200 w-2.5"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}