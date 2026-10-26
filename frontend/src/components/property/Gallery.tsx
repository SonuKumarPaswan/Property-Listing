"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryProps {
  images?: { url: string; isPrimary?: boolean }[];
  title?: string;
}

const Gallery = ({ images = [], title = "Property" }: GalleryProps) => {
  const validImages = Array.isArray(images)
    ? images.filter(
        (image): image is { url: string; isPrimary?: boolean } =>
          Boolean(image && typeof image.url === "string" && image.url.trim().length > 0)
      )
    : [];

  const galleryImages = validImages.map((image) => image.url);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Reset selected image when images prop changes
  useEffect(() => {
    setSelectedImage(null);
  }, [images]);

  // First image displays by default; clicking thumbnail overrides it
  const mainImage =
    selectedImage && galleryImages.includes(selectedImage)
      ? selectedImage
      : galleryImages[0] || null;

  return (
    <div className="space-y-4 font-sans">
      {/* Main Image Container */}
      <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs bg-[#F5F7FF] flex items-center justify-center">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-[#F5F7FF] w-full h-full">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB] text-[#4B5563] mb-3 shadow-2xs">
              <svg
                className="w-7 h-7 text-[#4B5563]/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#4B5563]">No images available</p>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 0 && (
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {galleryImages.map((image, index) => {
            const isSelected = mainImage === image;
            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`View ${title} image ${index + 1}`}
                aria-pressed={isSelected}
                className={`relative min-w-[100px] sm:min-w-[120px] h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shrink-0 bg-[#F5F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2043B0]/40 ${
                  isSelected
                    ? "border-[#2043B0] ring-2 ring-[#2043B0]/20 shadow-xs opacity-100"
                    : "border-[#E5E7EB] hover:border-blue-300 opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} view ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100px, 120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Gallery;