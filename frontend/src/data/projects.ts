import { PROPERTIES } from "./properties";

export interface IProjectDevelopment {
  _id: string;
  slug: string;
  title: string;
  location: string;
  city: string;
  price: number;
  listingType: "sale" | "rent";
  type: string;
  status: string;
  completionYear?: string;
  description: string;
  details: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    furnishing: string;
    parking?: boolean;
    areaUnit?: string;
  };
  images: { url: string; isPrimary?: boolean }[];
  amenities: string[];
  isVerified: boolean;
  isFeatured: boolean;
}

export interface ICarouselProject {
  title: string;
  slug: string;
  image: string;
  description: string;
  href: string;
}

// Completed developments data source for projects that do not exist as standard property listings
export const PROJECTS: IProjectDevelopment[] = [
  {
    _id: "p1",
    slug: "modern-office-park",
    title: "Modern Office Park",
    location: "Sector 62",
    city: "Noida",
    price: 32000000,
    listingType: "sale",
    type: "commercial",
    status: "Completed",
    completionYear: "2024",
    description:
      "A cutting-edge commercial space designed to foster innovation and collaboration. Modern Office Park features grade-A corporate offices, collaborative breakout zones, world-class conference facilities, and expansive natural light, establishing the highest standard for workplace excellence.",
    details: {
      bedrooms: 0,
      bathrooms: 4,
      area: 6800,
      furnishing: "furnished",
      parking: true,
      areaUnit: "sqft",
    },
    images: [
      {
        url: "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        isPrimary: false,
      },
    ],
    amenities: [
      "Grade-A Commercial Infrastructure",
      "High-Speed Smart Elevators",
      "24/7 Power Backup & Security",
      "Multi-Tier Parking Facility",
      "Central HVAC & Air Filtration",
      "Executive Meeting & Conference Rooms",
      "On-site Cafeteria & Wellness Hub",
      "Fiber-Optic High Speed Internet",
    ],
    isVerified: true,
    isFeatured: true,
  },
  {
    _id: "p2",
    slug: "eco-friendly-housing-development",
    title: "Eco-Friendly Housing Development",
    location: "Sector 137",
    city: "Noida",
    price: 18500000,
    listingType: "sale",
    type: "residential",
    status: "Completed",
    completionYear: "2023",
    description:
      "A sustainable housing project that combines modern living with environmental responsibility. Built with energy-efficient architecture, lush landscaped gardens, solar-powered facilities, and rainwater harvesting, offering a serene community living experience in the heart of the city.",
    details: {
      bedrooms: 3,
      bathrooms: 3,
      area: 2150,
      furnishing: "semi-furnished",
      parking: true,
      areaUnit: "sqft",
    },
    images: [
      {
        url: "https://reanty.themes-studio.com/assets/img/feature/feature-img5.jpg",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
        isPrimary: false,
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
        isPrimary: false,
      },
    ],
    amenities: [
      "Solar Power Generation",
      "Rainwater Harvesting System",
      "80% Lush Open Green Area",
      "EV Charging Stations",
      "Modern Clubhouse & Gymnasium",
      "Resort-style Swimming Pool",
      "Jogging & Cycling Track",
      "Zero-Waste Composting System",
    ],
    isVerified: true,
    isFeatured: true,
  },
];

// Helper to determine destination URL based on whether item exists in property data
export const getProjectLink = (slug: string): string => {
  const propertyExists = PROPERTIES.some((p) => p.slug === slug);
  return propertyExists ? `/properties/${slug}` : `/projects/${slug}`;
};

// All carousel items with their exact images, descriptions, and data-driven destinations
export const SUCCESSFUL_PROJECTS: ICarouselProject[] = [
  {
    title: "Luxury Apartment Complex",
    slug: "luxury-apartment-complex",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
    description:
      "A state-of-the-art residential complex offering unparalleled amenities and breathtaking views.",
    href: "/properties/luxury-apartment-complex",
  },
  {
    title: "Modern Office Park",
    slug: "modern-office-park",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
    description:
      "A cutting-edge commercial space designed to foster innovation and collaboration.",
    href: "/projects/modern-office-park",
  },
  {
    title: "Eco-Friendly Housing Development",
    slug: "eco-friendly-housing-development",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img5.jpg",
    description:
      "A sustainable housing project that combines modern living with environmental responsibility.",
    href: "/projects/eco-friendly-housing-development",
  },
  {
    title: "Business Hub",
    slug: "business-hub",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
    description:
      "Premium commercial hub built for growing businesses and startups.",
    href: "/properties/business-hub",
  },
  {
    title: "Corporate Tower",
    slug: "corporate-tower",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img1.jpg",
    description:
      "A modern business tower offering premium office spaces and facilities.",
    href: "/properties/corporate-tower",
  },
];
