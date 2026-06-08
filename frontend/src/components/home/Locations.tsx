const locations = [
  "Noida",
  "Greater Noida",
  "Delhi",
  "Gurgaon",
  "Ghaziabad",
];

export default function Locations() {
  return (
    <section className="py-16 bg-gray-100"> 
      <h2 className="text-4xl font-bold text-center mb-10 text-slate-900">
        Popular Locations
      </h2>

      <div className="container mx-auto flex flex-wrap justify-center gap-4">
        {locations.map((location) => (
          <div
            key={location}
            className="px-6 py-4 rounded-lg shadow bg-white text-lg font-medium text-gray-700 hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            {location}
          </div>
        ))}
      </div>
    </section>
  );
}