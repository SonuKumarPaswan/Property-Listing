"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Mohit Sharma",
    role: "Property Buyer",
    rating: 5,
    feedback:
      "I was looking for a comfortable home in a good location. The available options made it easier to compare properties and choose one that suited my family.",
    image: "https://res.cloudinary.com/c3e6qxy4/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
  },
  {
    id: 2,
    name: "Amit ",
    role: "Property Buyer",
    rating: 5,
    feedback:
      "I found a property that matched my budget and requirements. The team answered my questions and helped me understand the buying process.",
    image: "https://res.cloudinary.com/c3e6qxy4/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
  },
  {
    id: 3,
    name: "Devansh Tiwari",
    role: "Property Buyer",
    rating: 5,
    feedback:
      "I explored several properties before making my decision. The property details and location information were helpful when comparing my options..",
    image: "https://res.cloudinary.com/c3e6qxy4/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
  },
  {
    id: 4,
    name: "Firoz Saifi",
    role: "Home Owner",
    rating: 4,
    feedback:
      "The team guided me through every step and made the entire process smooth, transparent, and stress-free. I'm truly happy with my new home!",
    image: "https://res.cloudinary.com/c3e6qxy4/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
  },
  {
    id: 5,
    name: "Subodh Mahur",
    role: "Property Buyer",
    rating: 5,
    feedback:
      "I wanted a property with enough space and easy access to everyday essentials. I found a suitable option after comparing a few listings on the platform.",
    image: "https://res.cloudinary.com/c3e6qxy4/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
  },
  {
    id: 6,
    name: "Priya Verma",
    role: "Home Owner",
    rating: 5,
    feedback:
      "Very professional service. The entire buying process was smooth and transparent. Highly recommended!",
    image: "https://res.cloudinary.com/c3e6qxy4/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
  },
  {
    id: 7,
    name: "Rahul Sharma",
    role: "Investor",
    rating: 5,
    feedback:
      "Great investment opportunity. The property value and surrounding infrastructure make it a perfect choice.",
    image: "https://res.cloudinary.com/c3e6qxy4/image/upload/f_auto,q_auto/651c6da502353948bdc929f02da2b8e0",
  },
];

const CustomerFeedback = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            Trusted by hundreds of happy property buyers
          </p>
        </div>

        {/* Testimonials Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-7 shadow-xs hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* Stars Rating */}
                <div className="flex items-center gap-1 mb-4" aria-label={`${item.rating} out of 5 stars`}>
                  {[...Array(item.rating)].map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Feedback Message */}
                <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  &ldquo;{item.feedback}&rdquo;
                </p>
              </div>

              {/* Customer Profile Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#E5E7EB] mt-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border border-[#E5E7EB] shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-base text-[#172554] tracking-tight font-[Cinzel] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4B5563] font-medium mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CustomerFeedback;