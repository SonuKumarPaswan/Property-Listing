const features = [
  "Verified Properties",
  "Trusted Agents",
  "Best Prices",
  "24/7 Support",
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-800 px-12">
      <h2 className="text-4xl font-bold text-center mb-10">
        Why Choose Us
      </h2>

      <div className="container mx-auto grid md:grid-cols-4 gap-6 p-6 rounded-lg shadow-lg">
        {features.map((item) => (
          <div
            key={item}
            className="text-center p-6 shadow rounded-xl bg-gray-200 hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            <h3 className="font-semibold text-gray-900">{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}