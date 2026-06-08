import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mishtispaces.com",
      lastModified: new Date(),
    },
    {
      url: "https://mishtispaces.com/properties",
      lastModified: new Date(),
    },
    {
      url: "https://mishtispaces.com/blogs",
      lastModified: new Date(),
    },
  ];
}