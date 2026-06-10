"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Property Buyer",
    rating: 5,
    feedback:
      "Amazing experience! The property was exactly as described. The location, amenities, and support team exceeded my expectations.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Property Buyer",
    rating: 5,
    feedback:
      "Amazing experience! The property was exactly as described. The location, amenities, and support team exceeded my expectations.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Property Buyer",
    rating: 5,
    feedback:
      "Amazing experience! The property was exactly as described. The location, amenities, and support team exceeded my expectations.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Home Owner",
    rating: 5,
    feedback:
      "Very professional service. The entire buying process was smooth and transparent. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Property Buyer",
    rating: 5,
    feedback:
      "Amazing experience! The property was exactly as described. The location, amenities, and support team exceeded my expectations.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Home Owner",
    rating: 5,
    feedback:
      "Very professional service. The entire buying process was smooth and transparent. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Investor",
    rating: 4,
    feedback:
      "Great investment opportunity. The property value and surrounding infrastructure make it a perfect choice.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
];

const CustomerFeedback = () => {
  return (
    <section className="py-12 px-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-2">
          Trusted by hundreds of happy property buyers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(item.rating)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Feedback */}
            <p className="text-gray-600 leading-7 mb-6">
              "{item.feedback}"
            </p>

            {/* User */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold text-gray-900">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerFeedback;