"use client"
import {
  Building2,
  Briefcase,
  Landmark,
} from "lucide-react";

const commercialFeatures = [
  {
    icon: Building2,
    title: "Office Spaces",
    description:
      "Premium office spaces designed for productivity, growth, and modern business operations.",
  },
  {
    icon: Briefcase,
    title: "Retail Properties",
    description:
      "High-visibility retail locations in prime commercial zones for maximum customer reach.",
  },
  {
    icon: Landmark,
    title: "Commercial Suites",
    description:
      "Well-designed commercial suites that combine functionality, convenience, and a professional atmosphere for business success.",
  },
];

export default function Commercial() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#eff6ff_0%,transparent_55%)]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-5">
            Commercial Properties
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Commercial Real Estate
            <br />
            And Office Spaces
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Discover premium commercial properties tailored for offices,
            retail stores, startups, and investment opportunities across
            strategic business locations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {commercialFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-300">
                  <Icon className="w-10 h-10 text-blue-600 group-hover:text-white transition-all duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <button className="mt-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300">
            Explore Properties
          </button>
        </div>
      </div>
    </section>
  );
}