"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  Send,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (Matches About Us Page)
───────────────────────────────────────────────────────────────────────────── */
const subtleFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

/* ─────────────────────────────────────────────────────────────────────────────
   REUSABLE UI COMPONENTS (White & Blue Palette)
───────────────────────────────────────────────────────────────────────────── */
function PillBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0] shadow-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
      <span>{text}</span>
    </div>
  );
}

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <main className="min-h-screen bg-white text-[#172554] antialiased overflow-x-hidden">
        {/* ══════════════════════════════════════════
            1 · HERO SECTION (PURE BACKGROUND IMAGE - NO COLOR OVERLAY)
        ══════════════════════════════════════════ */}
        <div className="relative w-full min-h-[500px] h-[78vh] sm:h-[84vh] lg:h-screen overflow-hidden shadow-md">
          {/* Pure Background Image - Unaltered & Completely Natural */}
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c"
            alt="Commercial Spaces"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Hero Content - Left Side with Responsive Spacing below Navbar */}
          <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-5 sm:px-8 md:px-16 lg:px-24 pt-20 sm:pt-24 md:pt-28 z-10 max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={subtleFadeUp}
              className="mb-3 sm:mb-4"
            >
              <PillBadge text="Get In Touch" />
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={subtleFadeUp}
              custom={0.1}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[Cinzel] font-semibold leading-[1.18] tracking-tight text-white max-w-2xl"
            >
              Commercial
              <br />
              <span className="text-[#2043B0]">Spaces for Rent</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={subtleFadeUp}
              custom={0.2}
              className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base md:text-lg text-white leading-relaxed font-sans"
            >
              Get in touch with us for any inquiries or assistance. We&apos;re
              here to help you find your dream property!
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={subtleFadeUp}
              custom={0.3}
              className="mt-6 sm:mt-8 relative z-30"
            >
              <a
                href="https://wa.me/918745875061"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2043B0] hover:bg-blue-700 active:scale-95 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-950/20 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Bottom Right Floating Badge - hidden on small mobile, visible on sm+ */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 hidden sm:block">
            <a
              href="https://wa.me/918745875061"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2043B0] hover:bg-blue-700 active:scale-95 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            2 · MAIN CONTACT SECTION (Two Columns on Desktop, Single on Mobile)
        ══════════════════════════════════════════ */}
        <section className="relative px-4 sm:px-6 md:px-8 py-14 sm:py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={subtleFadeUp}
              className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto"
            >
              <PillBadge text="Contact With Us" />
              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold text-[#172554] tracking-tight 
              leading-tight">
                Looking For To Buy{" "}
                <span className="text-[#2043B0]">A Property?</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-start">
              {/* Left Column: Information & Images */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                className="lg:col-span-6 w-full"
              >
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#4B5563] mb-6 sm:mb-8 font-sans">
                  Browse our property listing and find your best and suitable
                  home or house for sale, rent and buying. It&apos;s so easy and
                  fast.
                </p>

                <div className="mb-8 sm:mb-10 space-y-3 sm:space-y-4 font-sans">
                  {[
                    "Largest premium real estate marketplace",
                    "Verified properties and trusted sellers",
                    "Find your dream home effortlessly",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={subtleFadeUp}
                      custom={i * 0.1}
                      className="flex items-start sm:items-center gap-3 text-sm sm:text-base font-medium text-[#172554]"
                    >
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-[#2043B0] shrink-0 mt-0.5 sm:mt-0" />
                      <span className="leading-snug">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Overlapping Responsive Images (Exact URLs & Alts Preserved) */}
                <div className="relative w-full max-w-[320px] sm:max-w-md md:max-w-lg mx-auto h-[260px] sm:h-[340px] md:h-[400px] mt-6 sm:mt-8">
                  {/* Image 1: Property */}
                  <div className="absolute top-0 left-0 w-[74%] h-[72%] overflow-hidden rounded border border-[#E5E7EB] shadow-md z-10 bg-blue-50/50">
                    <Image
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                      alt="Property"
                      fill
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Image 2: Bedroom */}
                  <div className="absolute bottom-0 right-0 w-[74%] h-[72%] overflow-hidden rounded border-4 border-white shadow-xl z-20 bg-blue-50/50">
                    <Image
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                      alt="Bedroom"
                      fill
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={0.1}
                className="lg:col-span-6 w-full"
              >
                <div className=" border border-[#E5E7EB] bg-white p-5 sm:p-8 md:p-10 shadow-xs hover:border-blue-300 transition-all duration-300">
                  <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                    <span>Send a Message</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] mb-6 sm:mb-8">
                    Contact Us
                  </h3>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5 font-sans"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#172554] mb-1.5 sm:mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        value={contact.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded border border-[#E5E7EB] bg-[#F5F7FF]/50 text-[#172554] placeholder:text-gray-400 focus:bg-white focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 outline-none transition-all duration-200 text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#172554] mb-1.5 sm:mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        value={contact.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded border border-[#E5E7EB] bg-[#F5F7FF]/50 text-[#172554] placeholder:text-gray-400 focus:bg-white focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 outline-none transition-all duration-200 text-sm"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#172554] mb-1.5 sm:mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="How can we help you?"
                        value={contact.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded border
                         border-[#E5E7EB] bg-[#F5F7FF]/50 text-[#172554] placeholder:text-gray-400 
                         focus:bg-white focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 outline-none 
                         transition-all duration-200 text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                       bg-[#2043B0] hover:bg-blue-700 active:scale-95 text-white font-semibold px-6 sm:px-8 py-3.5 
                       rounded-xl shadow-sm shadow-blue-900/10 transition-all duration-200 cursor-pointer text-sm sm:text-base"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3 · CONTACT INFORMATION CARDS
        ══════════════════════════════════════════ */}
        <section className="relative px-4 sm:px-6 md:px-8 py-14 sm:py-20 lg:py-24 bg-[#F5F7FF] border-y border-[#E5E7EB]">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={subtleFadeUp}
              className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto"
            >
              <PillBadge text="Reach Out" />
              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
                Get In Touch <span className="text-[#2043B0]">With Us</span>
              </h2>
            </motion.div>

            {/* Responsive grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1: Location */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={0.1}
                className="bg-white rounded border border-[#E5E7EB] p-6 sm:p-8 text-center shadow-xs hover:border-blue-300 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-100 text-[#2043B0] flex items-center justify-center mb-5 sm:mb-6 shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-2 font-sans">
                  Our Location
                </span>

                <h3 className="text-base sm:text-lg font-[Cinzel] font-bold text-[#172554] leading-relaxed">
                  Noida Sector 62,
                  <br />
                  Uttar Pradesh, India
                </h3>
              </motion.div>

              {/* Card 2: Email */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={0.2}
                className="bg-white rounded border border-[#E5E7EB] p-6 sm:p-8 text-center shadow-xs hover:border-blue-300 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-100 text-[#2043B0] flex items-center justify-center mb-5 sm:mb-6 shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-2 font-sans">
                  Email Address
                </span>

                <div className="text-sm sm:text-base lg:text-lg font-[Cinzel] font-bold text-[#172554] leading-relaxed
                 break-all max-w-full">
                  <a
                    href="mailto:support@mishtispaces.com"
                    className="hover:text-[#2043B0] transition-colors block py-0.5"
                  >
                    support@mishtispaces.com
                  </a>
                  <a
                    href="mailto:info@mishtispaces.com"
                    className="hover:text-[#2043B0] transition-colors block py-0.5"
                  >
                    info@mishtispaces.com
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Phone (Tablet: centered in 2-col flow) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={0.3}
                className="bg-white rounded border border-[#E5E7EB] p-6 sm:p-8 text-center shadow-xs hover:border-blue-300 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none w-full"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-100 text-[#2043B0] flex items-center justify-center mb-5 sm:mb-6 shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-[#2043B0] mb-2 font-sans">
                  Phone Number
                </span>

                <div className="text-sm sm:text-base lg:text-lg font-[Cinzel] font-bold text-[#172554] leading-relaxed">
                  <a
                    href="tel:+918745875061"
                    className="hover:text-[#2043B0] transition-colors block py-0.5"
                  >
                    +91 8745875061
                  </a>

                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4 · GOOGLE MAP SECTION
        ══════════════════════════════════════════ */}
        <section className="relative px-4 sm:px-6 md:px-8 py-14 sm:py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={subtleFadeUp}
              className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto"
            >
              <PillBadge text="Our Location" />
              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
                Visit Our <span className="text-[#2043B0]">Office</span>
              </h2>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-[#4B5563] font-sans">
                C-127, Sector 63, Noida, Uttar Pradesh
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFadeUp}
              className="overflow-hidden  border border-[#E5E7EB] shadow-md w-full h-[280px] sm:h-[380px] md:h-[450px]"
            >
              <iframe
                title="Office Location Map"
                src="https://maps.google.com/maps?q=C-127%20Sector%2063%20Noida&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
