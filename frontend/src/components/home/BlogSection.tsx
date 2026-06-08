const blogs = [
  "Top Investment Areas in Noida",
  "How to Buy Your First Home",
  "Luxury Property Trends 2026",
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10">
        Latest Blogs
      </h2>

      <div className="container mx-auto grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog}
            className="bg-white p-6 rounded-xl shadow"
          >
            {blog}
          </div>
        ))}
      </div>
    </section>
  );
}