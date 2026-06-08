const properties = [
  {
    id: 1,
    title: "Luxury Villa",
    price: "₹2.5 Cr",
    image: "/property1.jpg",
  },
  {
    id: 2,
    title: "Modern Apartment",
    price: "₹95 Lakh",
    image: "/property2.jpg",
  },
  {
    id: 3,
    title: "Premium Penthouse",
    price: "₹3.2 Cr",
    image: "/property3.jpg",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        Featured Properties
      </h2>

      <div className="container mx-auto grid md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-60 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-bold">{property.title}</h3>
              <p>{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}