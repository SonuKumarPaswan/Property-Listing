import Image from "next/image";

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
            <div className="relative w-full h-60 rounded-t-xl overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
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