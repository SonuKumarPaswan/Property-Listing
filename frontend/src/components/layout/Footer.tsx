"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Mail, Phone, MapPin, Check } from "lucide-react";

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
   FOOTER DATA (All Original Data Preserved)
───────────────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", path: "#" },
  { label: "Properties", path: "/properties" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms-of-service" },
  { label: "Cookie Policy", path: "/cookie-policy" },
  { label: "Sitemap", path: "/sitemap" },
];

const PROPERTY_TYPES = [
  "Apartments",
  "Villas",
  "Independent Houses",
  "Commercial Spaces",
  "Plots & Land",
  "PG / Hostels",
  "Builder Floors",
];

const CITIES = [
  "New Delhi",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Gurugram",
  "Faridabad",
  "Sonipat",
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590764961448",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918745875061",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="18"
        height="18"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.15 1.59 5.95L0 24l6.32-1.66a11.88 11.88 0 0 0 5.75 1.47h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.47-8.42zM12.08 21.8a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.75.98 1-3.65-.24-.37a9.82 9.82 0 1 1 8.37 4.63zm5.39-7.35c-.29-.14-1.72-.85-1.99-.95-.27-.1-.46-.14-.66.14-.19.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.14-1.2-.44-2.29-1.4-.85-.76-1.42-1.69-1.59-1.98-.17-.29-.02-.44.12-.58.13-.13.29-.34.44-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.66-1.58-.9-2.17-.24-.57-.49-.49-.66-.5h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-.96 2.43.06 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.09 4.89 4.33.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.72-.7 1.96-1.37.24-.67.24-1.25.17-1.37-.07-.12-.27-.19-.56-.33z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mishtispaces/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="18"
        height="18"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mishti-spaces-4994bb413/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@mishti-spaces",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="white"
        />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS & ANIMATED COUNTER
───────────────────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN FOOTER COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <footer className="relative bg-white text-[#172554] border-t border-[#E5E7EB] antialiased overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[350px] w-[700px] rounded-full bg-[#2043B0]/5 blur-3xl" />

        {/* ══════════════════════════════════════════
            1 · STATISTICS BAR
        ══════════════════════════════════════════ */}
        <div className="border-b border-[#E5E7EB] bg-[#F5F7FF] py-8 sm:py-10 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: 12000, suffix: "+", label: "Properties Listed" },
                { value: 8000, suffix: "+", label: "Happy Clients" },
                { value: 50, suffix: "+", label: "Cities Covered" },
                { value: 98, suffix: "%", label: "Satisfaction Rate" },
              ].map((s, index) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center text-center px-4 ${
                    index !== 3 ? "md:border-r md:border-[#E5E7EB]" : ""
                  }`}
                >
                  <span className="text-3xl sm:text-4xl font-[Cinzel] font-bold text-[#2043B0] tracking-tight">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#172554]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            2 · MAIN CONTENT (4 Columns)
        ══════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* ── Column 1: Brand & Contact ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFadeUp}
              className="lg:col-span-4"
            >
              <Link href="/" className="inline-block">
                <span className="font-[Cinzel] text-2xl font-bold tracking-tight text-[#172554]">
                  Mishti <span className="text-[#2043B0]">Spaces</span>
                </span>
              </Link>
              <div className="text-xs font-semibold tracking-wider uppercase text-[#2043B0] mt-1">
                Real Estate Platform
              </div>

              <p className="mt-4 text-sm text-[#4B5563] leading-relaxed max-w-sm font-sans">
                Buy, sell, or rent properties with ease. Thousands of verified
                listings across India, trusted by buyers and agents alike.
              </p>

              {/* Contact Information */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#172554] font-[Cinzel] mb-3">
                  Contact us:
                </h4>
                <div className="flex flex-col gap-2.5 text-sm text-[#4B5563] font-sans">
                  <a
                    href="mailto:support@mishtispaces.com"
                    className="flex items-center gap-2.5 hover:text-[#2043B0] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#2043B0] shrink-0" />
                    <span>support@mishtispaces.com</span>
                  </a>
                  <a
                    href="tel:+918745875061"
                    className="flex items-center gap-2.5 hover:text-[#2043B0] transition-colors"
                  >
                    <Phone className="h-4 w-4 text-[#2043B0] shrink-0" />
                    <span>+91 8745875061</span>
                  </a>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-[#2043B0] shrink-0" />
                    <span>Noida, Uttar Pradesh, India</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-6 flex items-center gap-2.5 flex-wrap">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-lg border border-[#E5E7EB] bg-[#F5F7FF] text-[#2043B0] shadow-xs hover:border-[#2043B0] hover:bg-[#2043B0] hover:text-white transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#2043B0]/30"
                    title={s.label}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Column 2: Quick Links ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFadeUp}
              custom={0.1}
              className="lg:col-span-2"
            >
              <h3 className="font-[Cinzel] text-base font-bold text-[#172554] tracking-wide mb-4">
                Quick links
              </h3>
              <nav className="flex flex-col gap-2.5 font-sans">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.path}
                    className="group flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#2043B0] transition-colors duration-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-300 group-hover:bg-[#2043B0] group-hover:scale-125 transition-all duration-200" />
                    <span>{l.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* ── Column 3: Property Types ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFadeUp}
              custom={0.2}
              className="lg:col-span-2"
            >
              <h3 className="font-[Cinzel] text-base font-bold text-[#172554] tracking-wide mb-4">
                Property types
              </h3>
              <nav className="flex flex-col gap-2.5 font-sans">
                {PROPERTY_TYPES.map((t) => (
                  <Link
                    key={t}
                    href="/properties"
                    className="group flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#2043B0] transition-colors duration-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-300 group-hover:bg-[#2043B0] group-hover:scale-125 transition-all duration-200" />
                    <span>{t}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* ── Column 4: Newsletter & Cities ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFadeUp}
              custom={0.3}
              className="lg:col-span-4"
            >
              <h3 className="font-[Cinzel] text-base font-bold text-[#172554] tracking-wide mb-4">
                Stay updated
              </h3>
              <p className="text-sm text-[#4B5563] mb-4 leading-relaxed font-sans">
                Get the latest property deals and market insights delivered to your inbox.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2.5 rounded-lg border border-blue-200 bg-[#F5F7FF] px-4 py-3 text-sm text-[#2043B0] font-medium font-sans">
                  <Check className="h-4 w-4 shrink-0 text-[#2043B0]" />
                  <span>You&apos;re subscribed! Welcome aboard.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-0"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                    className="w-full sm:flex-1 rounded-lg sm:rounded-r-none border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#172554] placeholder-gray-400 focus:border-[#2043B0] focus:ring-1 focus:ring-[#2043B0] focus:outline-none transition-colors font-sans"
                  />
                  <button
                    type="submit"
                    className="rounded-lg sm:rounded-l-none bg-[#2043B0] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-95 transition-all duration-200 whitespace-nowrap shadow-xs cursor-pointer font-sans"
                  >
                    Subscribe
                  </button>
                </form>
              )}

              <div className="mt-8">
                <h4 className="font-[Cinzel] text-xs font-bold uppercase tracking-wider text-[#172554] mb-3">
                  Top cities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((city) => (
                    <span
                      key={city}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-[#F5F7FF] px-3 py-1 text-xs font-medium text-[#2043B0] hover:bg-blue-100/70 hover:border-[#2043B0] transition-colors cursor-default"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                      <span>{city}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            3 · BOTTOM BAR
        ══════════════════════════════════════════ */}
        <div className="border-t border-[#E5E7EB] bg-[#F5F7FF]/50 py-6 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#4B5563] text-center md:text-left font-sans">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#2043B0]" />
                <span>
                  © {new Date().getFullYear()} Mishti Spaces. All rights reserved.
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.path}
                    className="hover:text-[#2043B0] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="text-[#6B7280]">
                Made with ♥ in India
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
