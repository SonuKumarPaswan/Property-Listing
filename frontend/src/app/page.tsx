"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PropertyCard from "@/components/property/PropertyCard";

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchLocation.trim()) return;

    // 👉 Redirect to properties page with query
    router.push(`/properties?search=${searchLocation}`);
  };

  return (
    <div>
      <Navbar />

      <section className="relative py-20 h-screen flex items-center justify-center text-center text-white">
        <div className="h-full absolute inset-0 bg-[url('https://kmhengineering.com/images/projects/spiranova/3.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-500 hover:text-red-500">Find Your</span> Dream Home
          </h1>

          <p className="mb-6 text-lg">
            Buy, Sell or Rent properties easily with Mishti Spaces
          </p>

          {/* 🔥 FORM START */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3 justify-center"
            
          >
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Enter city or location"
              className="px-4 py-3 rounded-lg text-black w-full md:w-80"
            />

            <button
              type="submit"
              className="bg-blue-600 px-6 py-3 rounded-lg"
            >
              Search
            </button>
          </form>
          {/* 🔥 FORM END */}
        </div>
      </section>
       <PropertyCard     />
    </div>
  );
}