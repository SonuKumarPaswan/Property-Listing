
"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Home Buyer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Mishti Spaces helped me find my dream home in Noida. The process was smooth and transparent.",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Property Investor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Excellent platform with verified properties and professional support. Highly recommended.",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Commercial Buyer",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    review:
      "Found the perfect office space through Mishti Spaces. Great customer service and guidance.",
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Luxury Home Owner",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    review:
      "Beautiful listings and genuine property details. My experience was fantastic.",
  },
  {
    id: 5,
    name: "Vikash Gupta",
    role: "Real Estate Investor",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    review:
      "The team guided me through every step of the investment process. Very professional.",
  },
];

export default function CustomersSaying() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl font-bold text-slate-900 mb-12">
          What Our Customers Say
        </h2>

        <div className="relative">
          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      "{item.review}"
                    </p>

                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-bold text-lg text-slate-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-0 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
          >
            ❮
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-0 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
          >
            ❯
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}