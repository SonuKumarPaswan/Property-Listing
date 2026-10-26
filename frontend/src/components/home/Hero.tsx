"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 to-blue overflow-hidden  ">
      {/* Background Image */}

      <div className="absolute inset-0 z-0">
        <Image
          src="/home/homePage.png"
          alt="Modern House"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-[Cinzel] leading-tight tracking-tight text-white">
            Find The{" "}
            <motion.span className="text-[#2043B0] font-semibold inline-flex ">
              {"Perfect Office Space".split("").map((char, index) => (
                <motion.span
                  key={index}
                  whileHover={{
                    y: -10,
                    scale: 1.18,
                    transition: {
                      type: "spring",
                      stiffness: 450,
                      damping: 14,
                    },
                  }}
                  className="inline-block cursor-pointer select-none"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>{" "}

            For Your Business.
          </h1>


          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: "easeInOut",
            }}
            className="text-lg md:text-xl font-[Segoe UI] text-white max-w-md leading-relaxed"
          >
            Discover premium office spaces, coworking hubs, and commercial
            properties in prime locations. Find the ideal workspace that helps
            your business grow.
          </motion.p>


          <Link href="/start-listing" className="max-w-max   bg-[#2043B0] hover:bg-blue-600  font-[Cinzel] transition px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center gap-2">
            Start Listing <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
