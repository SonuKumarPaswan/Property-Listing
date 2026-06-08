const stats = [
  { title: "Properties", value: "5000+" },
  { title: "Clients", value: "2000+" },
  { title: "Agents", value: "150+" },
  { title: "Cities", value: "25+" },
];

export default function Stats() {
  return (
    <section className="py-16">
      <div className="container mx-auto grid md:grid-cols-4 gap-6 text-center">
        {stats.map((item) => (
          <div key={item.title}>
            <h3 className="text-4xl font-bold">
              {item.value}
            </h3>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}