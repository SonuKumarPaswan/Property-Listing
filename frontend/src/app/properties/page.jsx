import React from "react";
import SharedPropertyListings from "@/components/property/SharedPropertyListings";

export const metadata = {
  title: "Properties in India | Buy, Rent & Commercial Properties | Mishti Spaces",
  description:
    "Explore thousands of verified properties across Noida, Delhi NCR, Gurgaon, Mumbai and Bangalore with Mishti Spaces.",
};

const Page = () => {
  return (
    <SharedPropertyListings
      mode="all"
      title="All Properties in India"
      description="Browse verified residential apartments, luxury villas, commercial offices, and investment plots across prime cities."
    />
  );
};

export default Page;

