"use client";

import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  "/office/office1.jpeg",
  "/office/office2.jpeg",
  "/office/office3.jpeg",
  "/office/office4.jpeg",
  "/office/office5.jpeg",
  "/office/office6.jpeg",
  "/office/office7.jpeg",
  "/office/office8.jpeg",
];

const Gallery = () => {
  const [mainImage, setMainImage] = useState(galleryImages[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-[460px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl">
        <Image
          src={mainImage}
          alt="Property"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Scrollable Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            onClick={() => setMainImage(image)}
            className={`relative min-w-[120px] h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
              mainImage === image
                ? "border-blue-600 scale-105"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              src={image}
              alt={`Property view ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;