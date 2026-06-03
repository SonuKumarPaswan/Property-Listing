"use client";

import Commercial from "@/components/home/Commercial";
import FeatureProperty from "@/components/home/FeatureProperty";
import Hero from "@/components/home/Hero";
import ServicesProvider from "@/components/home/ServicesProvider";
import Navbar from "@/components/layout/Navbar";
import NoidaOffice from "@/components/property/NoidaOffice";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="bg-white p-10 ">
        <NoidaOffice />
        <Commercial />
        <ServicesProvider />
        <FeatureProperty />
      </div>
    </div>
  );
}
