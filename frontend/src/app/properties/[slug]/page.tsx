import { notFound } from "next/navigation";

import { PROPERTIES } from "@/data/properties";

import NoidaLuxuryProperty from "@/components/home/NoidaLuxuryProperty";
import CustomerFeedback from "@/components/property/CustomerFeedback";
import Gallery from "@/components/property/Gallery";
import NoidaOffice from "@/components/property/NoidaOffice";
import PropertyDetails from "@/components/property/PropertyDetails";
import Sidebar from "@/components/property/Sidebar";
import SharedPropertyListings from "@/components/property/SharedPropertyListings";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  // Safeguard: In case Next.js dev server catches static routes under [slug]
  if (slug === "buy") {
    return (
      <SharedPropertyListings
        mode="sale"
        title="Properties for Sale"
        description="Explore verified residential flats, luxury villas, commercial spaces, and
        plots available for purchase across India."
      />
    );
  }

  if (slug === "rent") {
    return (
      <SharedPropertyListings
        mode="rent"
        title="Properties for Rent"
        description="Discover verified rental flats, studios, and residential homes across prime cities."
      />
    );
  }

  if (slug === "commercial") {
    return (
      <SharedPropertyListings
        mode="commercial"
        title="Commercial Properties"
        description="Explore grade-A office spaces, corporate towers, and commercial shops in prime business districts."
      />
    );
  }

  if (slug === "new") {
    return (
      <SharedPropertyListings
        mode="new"
        title="New Project Developments"
        description="Newly launched and upcoming development complexes and residential projects with modern amenities."
      />
    );
  }

  // Find the property using its slug
  let property = PROPERTIES.find(
    (item) => item.slug === slug
  );

  // If not found by exact slug, attempt normalized match or alias lookup
  if (!property) {
    const normalized = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    property = PROPERTIES.find(
      (item) =>
        item.slug === normalized ||
        item.slug.includes(normalized) ||
        normalized.includes(item.slug)
    );
  }

  // If still not found, check word-by-word token overlap
  if (!property) {
    const tokens = slug.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 2);
    if (tokens.length > 0) {
      property = PROPERTIES.find((item) =>
        tokens.some((token) => item.slug.includes(token))
      );
    }
  }

  // Show 404 if property does not exist
  if (!property) {
    notFound();
  }

  // Convert property data to the format used by the UI
  const propertyDetails = {
    ...property,
    location: {
      address: property.location,
      city: property.city,
      state: "",
    },
    details: {
      ...property.details,
      areaUnit: "sqft",
      parking: false,
    },
    amenities: [],
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Gallery
              key={property.slug}
              images={property.images}
              title={property.title}
            />
          </div>

          <div className="lg:col-span-4">
            <Sidebar property={propertyDetails} />
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-12">
          <PropertyDetails property={propertyDetails} />
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