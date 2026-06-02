"use client";

import {
    Briefcase,
    Building2,
    Landmark,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const features = [
    {
        icon: Building2,
        title: "Modern Office Spaces",
        description:
            "Premium office environments designed for productivity, collaboration, and business growth in prime locations.",
    },
    {
        icon: Briefcase,
        title: "Corporate Workspaces",
        description:
            "Fully equipped corporate workspaces built for enterprises, startups, and professional teams.",
    },
    {
        icon: Landmark,
        title: "Executive Business Suites",
        description:
            "Luxury business suites offering a prestigious address with world-class amenities and seamless operations.",
    },
];

export default function Commercial2() {

     const [searchLocation, setSearchLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchLocation.trim()) return;

    // 👉 Redirect to properties page with query
    router.push(`/properties?search=${searchLocation}`);
  };
    return (
        <section className="py-24 bg-white relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 " />

            <div className="container mx-auto px-6 relative z-10">

                {/* IMAGE SECTION (like your reference) */}
                <div className="flex justify-center mb-20">
                    <div className="relative w-full max-w-5xl h-[520px]">

                        {/* Left Image */}
                        <div className="absolute left-0 bottom-0 w-[30%] h-[90%] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/home/office-1.jpg"
                                alt="Office Space"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Center Image */}
                        <div className="absolute top-2 left-2 -translate-x-1/2 top-0 w-[30%] h-[90%] rounded-2xl overflow-hidden shadow-2xl z-10">
                            <Image
                                src="/home/offfice-2.jpg"
                                alt="Corporate Office"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Blue Badge (converted from orange → royal blue) */}
                        <div className="absolute top-10 left-[52%] -translate-x-1/2 z-20">
                            <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex flex-col items-center justify-center shadow-xl">
                                <span className="text-3xl">★</span>
                                <span className="text-sm font-semibold">Premium</span>
                                <span className="text-sm font-semibold">Offices</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* TEXT SECTION */}
                <div className="max-w-3xl mx-auto text-center mb-16">

                    <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-5">
                        Commercial Spaces
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                        Premium Office Spaces
                        <br />
                        Built for Growth
                    </h2>

                    <p className="mt-6 text-lg text-slate-600">
                        Discover world-class office environments designed for modern businesses,
                        offering strategic locations, flexibility, and long-term value.
                    </p>
                </div>

                {/* CARDS */}
                <div className="grid md:grid-cols-3 gap-8">

                    {features.map((item, index) => {
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
                        Explore Office Listings
                    </button>
                </div>


                <div>
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col md:flex-row gap-3 justify-center"

                    >
                        <input
                            type="text"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            placeholder="Enter city or location"
                            className="px-4 py-3 rounded-lg text-black w-full md:w-80"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 px-6 py-3 rounded-lg"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}