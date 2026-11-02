import React from "react";
import { Metadata } from "next";
import SharedPropertyListings from "@/components/property/SharedPropertyListings";

export const metadata: Metadata = {
  title: "New Projects & Developments | Under-Construction Deals | Mishti Spaces",
  description:
    "Explore newly launched and upcoming residential and commercial development projects with high appreciation potential across India.",
};

export default function NewProjectsPage() {
  return (
    <SharedPropertyListings
      mode="new"
      title="New Projects & Developments"
      description="Newly launched and upcoming development complexes and residential towers featuring state-of-the-art modern amenities."
    />
  );
}

