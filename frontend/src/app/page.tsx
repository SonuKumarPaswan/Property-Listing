"use client";

import Commercial from "@/components/home/Commercial";
import CompletedProjects from "@/components/home/CompletedProjects";
import CustomersSaying from "@/components/home/CustomersSaying";
import FeatureProperty from "@/components/home/FeatureProperty";
import Hero from "@/components/home/Hero";
import NoidaLuxuryProperty from "@/components/home/NoidaLuxuryProperty";
import RecentBlog from "@/components/home/RecentBlog";
import RecentSearchProperty from "@/components/home/RecentSearchProperty";
import ServicesProvider from "@/components/home/ServicesProvider";
import SuccessfulProjects from "@/components/home/SuccessfulProjects";
import Navbar from "@/components/layout/Navbar";
import NoidaOffice from "@/components/property/NoidaOffice";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="bg-white p-10 ">
        <RecentSearchProperty />
        <NoidaOffice />
        <NoidaLuxuryProperty />
        <Commercial />
        <ServicesProvider />
        <FeatureProperty />
        <CustomersSaying />
        <SuccessfulProjects />
        <CompletedProjects />
        <RecentBlog />
      </div>
    </div>
  );
}
