"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Data:", contact);

    setContact({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen ">
      <div className="text-center ">
        {/* Image Container */}
        <div className="relative w-full h-[400px] md:h-120  overflow-hidden">

          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c"
            alt="Commercial Spaces"
            fill
            className="object-cover "
          />

          {/* Dark Overlay (important for readability) */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Text on top */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Commercial Spaces for Rent
            </h1>

            <p className="text-white/80 max-w-xl">
              Get in touch with us for any inquiries or assistance. We're here to help you find your dream property!
            </p>
          </div>
          {/* Bottom Right Badge */}
          <div className="absolute bottom-4 right-4 z-20">
            <a
              href="https://wa.me/918745875061"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-lg transition inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <section className="py-24 px-5 bg-white">



        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-lg">
              Contact With Us
            </span>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-slate-900">
              Looking For To Buy A Property?
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div>
              <p className="text-lg leading-relaxed text-slate-500 mb-8 max-w-xl">
                Browse our property listing and find your best and suitable home
                or house for sale, rent and buying. It's so easy and fast.
              </p>

              <ul className="mb-10 space-y-4">
                {[
                  "Largest premium real estate marketplace",
                  "Verified properties and trusted sellers",
                  "Find your dream home effortlessly",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-lg text-slate-900 flex items-start gap-2"
                  >
                    <span className="text-blue-600 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Images */}
              <div className="relative w-full h-[430px]">
                <div className="absolute w-[330px] h-[230px] overflow-hidden rounded-lg z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                    alt="Property"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute bottom-0 left-[120px] w-[370px] h-[240px] overflow-hidden rounded-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                    alt="Bedroom"
                    fill
                    className="object-cover"
                  />
                </div>


              </div>
            </div>

            {/* Right Form */}
            <form onSubmit={handleSubmit}>
              <div className="bg-slate-100 p-10 rounded-lg border-r-4 border-blue-600  hover:shadow-lg  transition ">
                <h2 className="text-4xl font-bold text-slate-900 mb-8">
                  Contact Us
                </h2>

                {/* Name */}
                <div className="mb-5">
                  <label className="block mb-2 text-slate-700 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={contact.name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-white outline-none text-black border hover:border-blue-600"
                  />
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="block mb-2 text-slate-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contact.email}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-white outline-none text-black border hover:border-blue-600"
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block mb-2 text-slate-700 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your Message"
                    value={contact.message}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-white outline-none text-black resize-none border hover:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}