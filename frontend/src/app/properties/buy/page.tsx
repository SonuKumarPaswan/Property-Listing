import React from "react";
import { Metadata } from "next";
import SharedPropertyListings from "@/components/property/SharedPropertyListings";

export const metadata: Metadata = {
  title: "Properties for Sale | Buy Homes & Offices | Mishti Spaces",
  description:
    "Explore verified properties for sale across Noida, Delhi NCR, Gurgaon, Mumbai, and Bangalore. Find your dream home or commercial investment.",
};

export default function BuyPropertiesPage() {
  return (
    <SharedPropertyListings
      mode="sale"
      title="Properties for Sale"
      description="Explore verified residential flats, luxury villas, commercial spaces, and plots available for purchase across India."
    />
  );
}

