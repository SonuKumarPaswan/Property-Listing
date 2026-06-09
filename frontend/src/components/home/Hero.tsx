
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
            Find The <span className="text-blue-300">Perfect Office</span> Space
            <span className="block">For Your Business.</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-md">
            Discover premium office spaces, coworking hubs, and commercial
            properties in prime locations. Find the ideal workspace that helps
            your business grow.
          </p>

          <Link href="/start-listing" className="max-w-max   bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center gap-2">
            Start Listing <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
