import React from "react";
import { Metadata } from "next";
import SharedPropertyListings from "@/components/property/SharedPropertyListings";

export const metadata: Metadata = {
  title: "Commercial Properties | Office Spaces & Retail Shops | Mishti Spaces",
  description:
    "Premium corporate office spaces, IT business towers, and commercial shops across prime commercial hubs in Noida, Bangalore, and Delhi NCR.",
};

export default function CommercialPropertiesPage() {
  return (
    <SharedPropertyListings
      mode="commercial"
      title="Commercial Properties"
      description="Premium grade-A office spaces, business towers, and commercial shops located in prime corporate and retail districts."
    />
  );
}

