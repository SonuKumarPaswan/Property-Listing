"use client";

import NoidaLuxuryProperty from "@/components/home/NoidaLuxuryProperty";
import CustomerFeedback from "@/components/property/CustomerFeedback";
import Gallery from "@/components/property/Gallery";
import NoidaOffice from "@/components/property/NoidaOffice";
import PropertyDetails from "@/components/property/PropertyDetails";
import Sidebar from "@/components/property/Sidebar";

const Page = () => {
  // Mock data (replace with real data from API later)
  const property = {
    title: "Premium 3 BHK Apartment",
    price: 12500000,
    listingType: "sale",
    description: "This luxury apartment is located in the heart of Noida...",
    location: {
      address: "Sector 63",
      city: "Noida",
      state: "Uttar Pradesh",
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      areaUnit: "sqft",
      parking: true,
    },
    amenities: [
      "gym",
      "pool",
      "security",
      "elevator",
      "power_backup",
      "cctv",
      "clubhouse",
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Gallery />
          </div>
          <div className="lg:col-span-4">
            <Sidebar property={property} />
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-12">
          <PropertyDetails property={property} />
        </div>
      </div>
      <NoidaLuxuryProperty />
      <NoidaOffice />

      <div className="mt-10">
        <CustomerFeedback />
      </div>
    </div>
  );
};

export default Page;
