import React from "react";
import { Metadata } from "next";
import SharedPropertyListings from "@/components/property/SharedPropertyListings";

export const metadata: Metadata = {
  title: "Properties for Rent | Rental Homes & Flats | Mishti Spaces",
  description:
    "Discover verified rental flats, studios, and apartments across prime Indian cities. Direct connection with verified owners.",
};

export default function RentPropertiesPage() {
  return (
    <SharedPropertyListings
      mode="rent"
      title="Properties for Rent"
      description="Discover verified apartments, studios, and residential spaces for rent with zero hidden fees across India."
    />
  );
}

