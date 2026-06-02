import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 to-blue overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/homePage.png" // Replace with your image path
          alt="Modern House"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
            Find The <span className="text-blue-300">Perfect Office</span> Space{" "}
            <span className="block">For Your Business.</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-md">
            Discover premium office spaces, coworking hubs, and commercial
            properties in prime locations. Find the ideal workspace that helps
            your business grow.
          </p>

          <button className="bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center gap-2">
           Start Listing <span>→</span>
          </button>
        </div>
      </div>

      {/* Bottom Gallery */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-24 h-16 bg-white/10 backdrop-blur rounded-xl overflow-hidden border border-white/20"
          >
            <Image
              src={`/home/interior${i}.png`} // Add your interior images
              alt={`Interior ${i}`}
              width={100}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
