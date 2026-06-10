import Commercial from "@/components/home/Commercial";
import CompletedProjects from "@/components/home/CompletedProjects";
import CustomersSaying from "@/components/home/CustomersSaying";
import FeatureProperty from "@/components/home/FeatureProperty";
import Hero from "@/components/home/Hero";
import Locations from "@/components/home/Locations";
import NoidaLuxuryProperty from "@/components/home/NoidaLuxuryProperty";
import PremiumProperties from "@/components/home/PremiumProperties";
import RecentSearchProperty from "@/components/home/RecentSearchProperty";
import ServicesProvider from "@/components/home/ServicesProvider";
import Stats from "@/components/home/Stats";
import SuccessfulProjects from "@/components/home/SuccessfulProjects";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Navbar from "@/components/layout/Navbar";
import NoidaOffice from "@/components/property/NoidaOffice";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title:
    "Noida Luxury Property | Buy Luxury Flats, Villas & Commercial Properties",
  description:
    "Explore premium luxury properties in Noida, Greater Noida and Delhi NCR. Buy flats, villas, office spaces and commercial properties at the best prices.",
  keywords: [
    "Noida Luxury Property",
    "Luxury Flats Noida",
    "Commercial Property Noida",
    "Property Dealer Noida",
    "Luxury Villas Noida",
    "Real Estate Noida",
  ],

  openGraph: {
    title: "Noida Luxury Property",
    description: "Premium luxury properties in Noida and Delhi NCR.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <div>
      <Navbar />

      <Hero />

      {/* <SearchSection /> */}

      <FeatureProperty />

      <NoidaLuxuryProperty />
      <NoidaOffice />
      <Locations />

      <Commercial />

      <WhyChooseUs />

      <PremiumProperties />

      <Stats />

      <ServicesProvider />

      <CustomersSaying />

      <CompletedProjects />

      <SuccessfulProjects />

      <RecentSearchProperty />
    </div>
  );
}
