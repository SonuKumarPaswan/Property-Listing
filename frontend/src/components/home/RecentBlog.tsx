import React from "react";

const blogs = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    title: "How to rent a home very easily contact with us details?",
    category1: "Rentals",
    category2: "Apartments",
    date: "Jun 18, 2026",
    author: "Mike Hesson",
    description:
      "How to rent a home very easily in this pandemic situation. You can rent house through using our platform...",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    title: "Browse our property listing and find your best suitable.",
    category1: "Villas",
    category2: "Rentals",
    date: "Jun 10, 2026",
    author: "Mike Hesson",
    description:
      "How to rent a home very easily in this pandemic situation. You can rent house through using our platform...",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    title: "How to rent a home very easily contact with us details?",
    category1: "Apartments",
    category2: "Lands",
    date: "Jun 4, 2026",
    author: "Mike Hesson",
    description:
      "How to rent a home very easily in this pandemic situation. You can rent house through using our platform...",
  },
];

const RecentBlog = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-slate-900">
            From Our Recent Blog
          </h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Find your suitable house here and stay safe and relaxe with pleasure
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  {blog.title}
                </h3>

                <div className="flex gap-3 text-sm text-gray-600 mb-4">
                  <span>🏷 {blog.category1}</span>
                  <span>{blog.category2}</span>
                </div>

                <p className="text-gray-500 leading-7 mb-5">
                  {blog.description}
                </p>

                <div className="flex justify-between text-sm text-gray-600 border-t pt-4">
                  <span>📅 {blog.date}</span>
                  <span>👤 {blog.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlog;