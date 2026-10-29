import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { PROPERTIES } from "@/data/properties";
import { PROJECTS } from "@/data/projects";

import NoidaLuxuryProperty from "@/components/home/NoidaLuxuryProperty";
import CustomerFeedback from "@/components/property/CustomerFeedback";
import Gallery from "@/components/property/Gallery";
import NoidaOffice from "@/components/property/NoidaOffice";
import PropertyDetails from "@/components/property/PropertyDetails";
import Sidebar from "@/components/property/Sidebar";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check if project is in properties
  const propertyMatch = PROPERTIES.find((item) => item.slug === slug);
  if (propertyMatch) {
    return {
      title: `${propertyMatch.title} | Mishti Spaces`,
      description: `Explore ${propertyMatch.title} in ${propertyMatch.city}.`,
    };
  }

  // Check in projects
  const project = PROJECTS.find((item) => item.slug === slug);
  if (project) {
    return {
      title: `${project.title} | Mishti Spaces`,
      description: project.description,
    };
  }

  return {
    title: "Project Not Found | Mishti Spaces",
  };
}

const ProjectDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  // 1. If this slug corresponds to an existing property listing, redirect to its property detail route
  const existingProperty = PROPERTIES.find((item) => item.slug === slug);
  if (existingProperty) {
    redirect(`/properties/${existingProperty.slug}`);
  }

  // Also check normalized match in properties in case of slug variations
  const normalized = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const normalizedProperty = PROPERTIES.find(
    (item) =>
      item.slug === normalized ||
      item.slug.includes(normalized) ||
      normalized.includes(item.slug)
  );
  if (normalizedProperty && normalizedProperty.slug === slug) {
    redirect(`/properties/${normalizedProperty.slug}`);
  }

  // 2. Search in completed development projects
  const project = PROJECTS.find(
    (item) => item.slug === slug || item.slug === normalized
  );

  // If not found in projects or properties, return 404
  if (!project) {
    notFound();
  }

  // Convert project data to the shape required by reusable UI components
  const projectDisplayData = {
    ...project,
    location: {
      address: project.location,
      city: project.city,
      state: "Uttar Pradesh",
    },
    details: {
      ...project.details,
      areaUnit: project.details.areaUnit || "sqft",
      parking: project.details.parking ?? true,
    },
    amenities: project.amenities || [],
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Gallery
              key={project.slug}
              images={project.images}
              title={project.title}
            />
          </div>

          <div className="lg:col-span-4">
            <Sidebar property={projectDisplayData} />
          </div>
        </div>

        {/* Project Details */}
        <div className="mt-12">
          <PropertyDetails property={projectDisplayData} />
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

export default ProjectDetailPage;
