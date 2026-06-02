"use client";

import Commercial from "@/components/home/Commercial";
import Hero from "@/components/home/Hero";
import ServicesProvider from "@/components/home/ServicesProvider";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
        <Commercial />
       <ServicesProvider />
    </div>
  );
}
