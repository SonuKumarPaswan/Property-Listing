const reviews = [
  {
    name: "Rahul Sharma",
    review: "Amazing property buying experience.",
  },
  {
    name: "Amit Kumar",
    review: "Professional agents and smooth process.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10">
        Testimonials
      </h2>

      <div className="container mx-auto grid md:grid-cols-2 gap-6">
        {reviews.map((item) => (
          <div
            key={item.name}
            className="bg-white p-6 rounded-xl shadow"
          >
            <p>{item.review}</p>
            <h4 className="font-bold mt-4">{item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}