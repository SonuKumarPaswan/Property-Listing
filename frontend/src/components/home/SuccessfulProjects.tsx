"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const projects = [
  {
    title: "Luxury Apartment Complex",
    slug: "luxury-apartment-complex",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
    description:
      "A state-of-the-art residential complex offering unparalleled amenities and breathtaking views.",
  },
  {
    title: "Modern Office Park",
    slug: "modern-office-park",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img4.jpg",
    description:
      "A cutting-edge commercial space designed to foster innovation and collaboration.",
  },
  {
    title: "Eco-Friendly Housing Development",
    slug: "eco-friendly-housing-development",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img5.jpg",
    description:
      "A sustainable housing project that combines modern living with environmental responsibility.",
  },
  {
    title: "Business Hub",
    slug: "business-hub",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
    description:
      "Premium commercial hub built for growing businesses and startups.",
  },
  {
    title: "Corporate Tower",
    slug: "corporate-tower",
    image:
      "https://reanty.themes-studio.com/assets/img/feature/feature-img1.jpg",
    description:
      "A modern business tower offering premium office spaces and facilities.",
  },
];

const SuccessfulProjects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 px-4 md:px-10 lg:px-10 bg-gray-50">
      {/* Heading */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Successful Projects
          </h1>

          <p className="text-gray-600 mt-3 max-w-3xl">
            Discover our successful real estate projects that have transformed
            landscapes and created thriving communities.
          </p>
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700"
          >
            <SlArrowLeft />
          </button>

          <button
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-700"
          >
            <SlArrowRight />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide overflow-x-hidden"
      >
        {projects.map((project, index) => (
          <Link
            key={index}
            href={`/projects/${project.slug}`}
            className="min-w-[300px] max-w-[280px] flex-shrink-0"
          >
            <div className="bg-white rounded-md overflow-hidden shadow-md  h-[350px]">
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {project.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                 {project.description.slice(0, 200)}
                </p>

                <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                  View Project
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SuccessfulProjects;