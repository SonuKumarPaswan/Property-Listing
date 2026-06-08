export default function SearchSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            className="border p-3 rounded"
            placeholder="Location"
          />
          <select className="border p-3 rounded">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>Villa</option>
          </select>

          <input
            className="border p-3 rounded"
            placeholder="Budget"
          />

          <button className="bg-blue-600 text-white rounded">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}