"use client";

import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";

interface NoidaOfficeData {
  title?: string;
  location?: string;
  price?: string;
  image?: string;
  slug?: string;
}

const NoidaOffice = () => {
  const [data, setData] = useState<NoidaOfficeData[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const fetchNoidaOffice = async () => {
    try {
      await fetch("/api/noida-office");

      setData([
        {
          title: "Luxury Office Space",
          slug: "luxury-office-space",
          location: "Sector 62, Noida",
          price: "₹1,25,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
        },
        {
          title: "Corporate Workspace",
          slug: "corporate-workspace",
          location: "Sector 18, Noida",
          price: "₹95,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
        },
        {
          title: "Premium Office",
          slug: "premium-office",
          location: "Sector 132, Noida",
          price: "₹2,10,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img1.jpg",
        },
        {
          title: "Business Hub",
          slug: "business-hub",
          location: "Sector 137, Noida",
          price: "₹1,45,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
        },
        {
          title: "Corporate Tower",
          slug: "corporate-tower",
          location: "Noida Extension",
          price: "₹1,85,00,000",
          image:
            "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch office data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoidaOffice();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Heading + Arrows */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Featured Office Spaces
            </h1>

            <p className="text-gray-600 mt-2">
              Explore our premium office spaces in Noida, designed for modern
              businesses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <SlArrowLeft />
            </button>

            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <SlArrowRight />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth overflow-x-hidden"
        >
          {data.map((office, index) => (
            <Link
              key={index}
              href={`/properties/${office.slug}`}
              className="min-w-[350px] flex-shrink-0 group"
            >
              <div
                className="relative h-[350px] rounded-xl overflow-hidden shadow-xl bg-cover bg-center flex items-end "
                style={{
                  backgroundImage: `url(${office.image})`,
                }}
              >
                <div className="p-6 w-[80%] bg-white rounded-tr-3xl">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {office.title}
                  </h2>

                  <div className="flex items-center text-gray-600 ">
                    <span>{office.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {office.price}
                      </p>
                    </div>

                    <div className="w-12 h-12 bg-gray-900 group-hover:bg-blue-600 transition-all rounded flex items-center justify-center text-white text-2xl">
                      →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoidaOffice;
