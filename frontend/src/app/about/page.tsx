"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  Users,
  MapPin,
  Search,
  SlidersHorizontal,
  LayoutDashboard,
  Bell,
  Sparkles,
  BarChart3,
  Globe2,
  FileCheck2,
  CheckCircle2,
  Target,
  Compass,
  Quote,
  Clock,
  Headphones,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (Subtle & Smooth)
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
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] 
    px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
      <span>{text}</span>
    </div>
  );
}

function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = "center",
}: {
  badge: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={subtleFadeUp}
      className={`mb-12 ${isCenter ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}`}
    >
      <PillBadge text={badge} />
      <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-tight">
        {title}{" "}
        {highlight && (
          <span className="text-[#2043B0] font-bold">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

function CleanCard({
  children,
  className = "",
  highlight = false,
}: {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`rounded border p-6 sm:p-7 transition-all duration-300 ${highlight
          ? "border-blue-300 bg-white shadow-md shadow-blue-900/5 ring-1 ring-blue-100"
          : "border-[#E5E7EB] bg-white shadow-xs hover:border-blue-300 hover:shadow-md"
        } ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <main className="min-h-screen bg-white text-[#172554] selection:bg-[#2043B0] selection:text-white antialiased">
        {/* ══════════════════════════════════════════
            1 · HERO SECTION (Pure White-and-Blue, No Images)
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-white to-white px-6 pt-32 pb-20 sm:pt-40 sm:pb-24 text-center">
          {/* Subtle blue ambient decorative shapes only (No image) */}
          <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[380px] w-[650px] rounded-full bg-[#2043B0]/5 blur-3xl" />
          <div className="pointer-events-none absolute right-[10%] top-20 h-48 w-48 rounded-full bg-blue-100/50 blur-2xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <PillBadge text="Digital Real Estate Platform · Launching 2026" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[Cinzel] font-bold leading-tight tracking-tight text-[#172554]"
            >
              About{" "}
              <span className="text-[#2043B0] font-bold">Mishti Spaces</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeInOut" }}
              className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-[#4B5563] leading-relaxed font-sans"
            >
              A new kind of real estate platform — built to connect buyers, sellers,
              owners, and renters across India through transparency, technology, and
              genuine trust. Your dream home is out there. We make finding it effortless.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeInOut" }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/properties"
                className="bg-[#2043B0] hover:bg-blue-700 transition px-8 py-3.5 rounded text-white font-semibold text-base inline-flex items-center gap-2 shadow-sm shadow-blue-900/20"
              >
                Explore Properties <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#story"
                className="border border-[#E5E7EB] bg-white hover:bg-[#F5F7FF] hover:border-blue-300 transition px-8 py-3.5 rounded text-[#172554] font-semibold text-base inline-flex items-center gap-2 shadow-xs"
              >
                Our Story
              </a>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            2 · STATISTICS SECTION (White Background)
        ══════════════════════════════════════════ */}
        <section className="relative border-y border-[#E5E7EB] bg-white px-6 py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {[
              { value: "50,000+", label: "Properties", icon: Building2 },
              { value: "30+", label: "Cities", icon: MapPin },
              { value: "1.2L+", label: "Users", icon: Users },
              { value: "98%", label: "Verified", icon: ShieldCheck },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={i * 0.08}
                  className="flex flex-col items-center text-center p-6 rounded border border-[#E5E7EB] bg-[#F5F7FF] shadow-xs hover:border-blue-200 transition-colors"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2043B0]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-[Cinzel] font-bold text-[#2043B0] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#172554]">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3 · PLATFORM OVERVIEW (White Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              badge="Platform Overview"
              title="A Digital Real Estate"
              highlight="Ecosystem"
              description="Mishti Spaces is not a brokerage. It is not an agency. It is a technology-first platform that brings the entire property search and transaction journey into one clean, transparent digital space."
            />

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
              >
                <CleanCard className="h-full bg-[#F5F7FF] border-[#E5E7EB]">
                  <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                    Technology First
                  </div>
                  <h3 className="mb-4 text-2xl font-[Cinzel] font-bold text-[#172554]">
                    Not a Broker. A Platform.
                  </h3>
                  <p className="leading-relaxed text-[#4B5563]">
                    Traditional real estate is broken. It is fragmented, opaque, and
                    driven by middlemen who benefit from information asymmetry. Mishti
                    Spaces was built to flip that model entirely. We are a digital
                    infrastructure layer — connecting buyers directly with sellers, and
                    renters directly with owners, without friction or artificial barriers.
                  </p>
                  <p className="mt-4 leading-relaxed text-[#4B5563]">
                    Agents and property owners can list on our platform, but the platform
                    itself is neutral, transparent, and always in the user&apos;s corner. Every
                    feature we ship, every policy we set, serves one goal: making the right
                    property easier to find, trust, and secure.
                  </p>
                </CleanCard>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={0.1}
              >
                <CleanCard className="h-full bg-[#F5F7FF] border-[#E5E7EB]">
                  <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                    Community Focus
                  </div>
                  <h3 className="mb-4 text-2xl font-[Cinzel] font-bold text-[#172554]">
                    Who the Platform Serves
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      {
                        role: "Buyers",
                        desc: "Discover and shortlist verified properties across cities with smart filters and real data.",
                      },
                      {
                        role: "Sellers",
                        desc: "Reach thousands of qualified buyers with detailed listings and analytics.",
                      },
                      {
                        role: "Owners",
                        desc: "List rental properties directly, manage inquiries, and connect without agents.",
                      },
                      {
                        role: "Agents",
                        desc: "Expand reach by listing on India's most transparent property discovery platform.",
                      },
                    ].map((item) => (
                      <div
                        key={item.role}
                        className="rounded-2xl border border-[#E5E7EB] bg-white p-4 transition-colors hover:border-blue-300 shadow-xs"
                      >
                        <p className="text-sm font-bold text-[#2043B0] font-[Cinzel]">{item.role}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#4B5563]">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </CleanCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4 · OUR STORY (Light-Blue Background)
        ══════════════════════════════════════════ */}
        <section id="story" className="relative px-6 py-20 sm:py-24 bg-[#F5F7FF] border-y border-[#E5E7EB]">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              badge="Our Story"
              title="A Vision Built for"
              highlight="2025 and Beyond"
            />

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  year: "2025",
                  title: "The Vision",
                  desc: "Mishti Spaces began not from a boardroom decision, but from a clear-eyed observation: India's property market was vast, full of potential, and deeply underserved by technology. In 2025, a small team came together with one shared conviction — that finding a home should be as simple and trustworthy as any modern digital experience. The vision was to build a platform that removed layers of complexity, brought transparency to every listing, and put the searcher firmly in control.",
                },
                {
                  year: "2025–26",
                  title: "The Build",
                  desc: "With a team of engineers and product thinkers, the platform was engineered from the ground up — prioritising speed, accuracy, and trust above all else. Every feature was designed with a long-term user experience in mind: how does a first-time buyer feel? What does a seller need to feel confident? What makes a renter trust a listing enough to actually show up? These questions drove every architectural and design decision throughout the development phase.",
                },
                {
                  year: "2026",
                  title: "The Launch",
                  desc: "Mishti Spaces is now moving towards its official launch in 2026. The platform has been built to scale — from a handful of cities to a nationwide presence — without compromising on the quality, verification standards, or user experience that defines it. The launch is not just a product release. It is the opening of a new chapter in how India discovers, evaluates, and secures property. The mission is set. The platform is ready. The journey begins.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.year}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={i * 0.1}
                >
                  <CleanCard className="h-full flex flex-col bg-white">
                    <div className="mb-4 inline-flex items-center gap-2 self-start rounded-md bg-blue-100 px-3 py-1 text-xs font-semibold text-[#2043B0]">
                      {item.year}
                    </div>
                    <h3 className="mb-3 text-xl font-[Cinzel] font-bold text-[#172554]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563] flex-1">
                      {item.desc}
                    </p>
                  </CleanCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFadeUp}
              className="mt-10"
            >
              <div className="relative overflow-hidden rounded border border-blue-200 bg-white p-8 sm:p-10 text-center shadow-xs">
                <Quote className="mx-auto mb-4 h-8 w-8 text-[#2043B0]" />
                <p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-[#172554] italic font-sans font-medium">
                  &ldquo;We did not build Mishti Spaces to be another listing directory. We built it to be
                  the platform every Indian turns to when a property decision matters — because for
                  most families, it is the most important decision of their lives.&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold tracking-wide text-[#2043B0] font-[Cinzel]">
                  — Mishti Spaces Founding Team
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5 · WHAT WE OFFER (White Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              badge="What We Offer"
              title="Everything You Need,"
              highlight="One Platform"
              description="From initial discovery to final decision — Mishti Spaces covers every part of the property journey with purpose-built features."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Property Search",
                  desc: "Search across thousands of residential and commercial listings — flats, villas, plots, and offices — with precision filters for location, budget, BHK, amenities, and more. Our search engine is fast, accurate, and built to surface what you actually want.",
                },
                {
                  num: "02",
                  title: "Dream Home Discovery",
                  desc: "Our AI-informed recommendation engine learns your preferences over time and proactively surfaces properties that match your lifestyle, budget, and location criteria — reducing the time from search to shortlist dramatically.",
                },
                {
                  num: "03",
                  title: "Verified Listings",
                  desc: "Every listing on Mishti Spaces passes through a structured verification process before going live. We confirm ownership documents, validate contact details, and perform authenticity checks — so you never waste time on outdated or fraudulent posts.",
                },
                {
                  num: "04",
                  title: "Buy, Sell and Rent",
                  desc: "Whether you are purchasing your first home, selling an investment property, or looking for a rental in a new city, Mishti Spaces provides a dedicated end-to-end flow for each journey — tailored to what that specific transaction actually requires.",
                },
                {
                  num: "05",
                  title: "Direct Connections",
                  desc: "We believe in reducing unnecessary layers. Buyers can connect directly with sellers and owners, ask questions, schedule visits, and negotiate — all from within the platform, with full transparency on both sides.",
                },
                {
                  num: "06",
                  title: "Transparent Pricing",
                  desc: "No hidden fees. No surprise brokerage. The price you see is the price of the property. We make the full cost structure visible upfront — because confident property decisions are built on complete information.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={i * 0.06}
                >
                  <CleanCard className="h-full flex flex-col bg-white">
                    <div className="mb-4 text-sm font-bold tracking-widest text-[#2043B0] font-[Cinzel]">
                      {item.num}
                    </div>
                    <h3 className="mb-2 text-lg font-[Cinzel] font-bold text-[#172554]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                      {item.desc}
                    </p>
                  </CleanCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6 · WHY CHOOSE US (Light-Blue Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-[#F5F7FF] border-y border-[#E5E7EB]">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                className="lg:col-span-5"
              >
                <PillBadge text="Why Choose Us" />
                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold text-[#172554] leading-tight">
                  The Mishti Spaces{" "}
                  <span className="text-[#2043B0]">Difference</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed font-sans">
                  In a market saturated with platforms that overpromise and underdeliver,
                  Mishti Spaces is being built on fundamentally different principles —
                  ones that put the user&apos;s interest first, always.
                </p>
                <p className="mt-3 text-base text-[#4B5563] leading-relaxed font-sans">
                  We are not measuring success by the number of listings we accumulate.
                  We measure it by how many people found the right property, made a
                  confident decision, and had an experience worth recommending.
                </p>
              </motion.div>

              <div className="flex flex-col gap-3.5 lg:col-span-7">
                {[
                  {
                    title: "Verified First, Listed Second",
                    desc: "No property appears on Mishti Spaces without passing our verification checks. Authenticity is the price of entry.",
                  },
                  {
                    title: "No Middlemen Dependency",
                    desc: "Buyers and owners connect directly. The platform enables the relationship — it does not extract rent from it.",
                  },
                  {
                    title: "Radical Transparency",
                    desc: "Pricing, ownership, availability — all visible, all honest. No fine print, no hidden agendas.",
                  },
                  {
                    title: "Built for Every City",
                    desc: "Not just metros. Our platform is designed to serve users across Tier-1, Tier-2, and Tier-3 cities with equal depth.",
                  },
                  {
                    title: "User Experience as Standard",
                    desc: "Every decision is made with the user's experience in mind — from search speed to mobile responsiveness.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={subtleFadeUp}
                    custom={i * 0.06}
                    className="flex items-start gap-4 rounded border border-[#E5E7EB] bg-white p-4 sm:p-5 transition-colors duration-200 hover:border-blue-300 shadow-xs"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#2043B0]">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#172554] text-base font-[Cinzel]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#4B5563] font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7 · PLATFORM FEATURES (White Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              badge="Platform Features"
              title="Engineered for"
              highlight="Effortless Discovery"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Search,
                  title: "Smart Search Engine",
                  desc: "Natural language and structured filters working together. Search by neighbourhood, builder name, project name, or specific requirement — the engine understands context, not just keywords.",
                },
                {
                  icon: SlidersHorizontal,
                  title: "Advanced Filter System",
                  desc: "Narrow results by budget, BHK, property age, floor preference, facing direction, nearby amenities, RERA registration, and 20+ additional parameters — all in real time.",
                },
                {
                  icon: LayoutDashboard,
                  title: "Personalised Dashboard",
                  desc: "Save searches, bookmark properties, track price changes, manage inquiries, and review your property history — all in a single, clean dashboard built for both buyers and listers.",
                },
                {
                  icon: Bell,
                  title: "Real-Time Updates",
                  desc: "Property availability changes instantly. Price drops, new listings, and status updates trigger immediate notifications — so you never miss a property that matters.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={subtleFadeUp}
                    custom={i * 0.08}
                  >
                    <CleanCard className="h-full flex flex-col bg-white">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2043B0]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 font-bold text-[#172554] text-base font-[Cinzel]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                        {item.desc}
                      </p>
                    </CleanCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8 · MISSION & VISION (Light-Blue Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-[#F5F7FF] border-y border-[#E5E7EB]">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
              >
                <div className="h-full rounded border border-blue-200 bg-white p-8 sm:p-9 shadow-xs">
                  <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                    <Target className="h-4 w-4" />
                    Our Mission
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554]">
                    Make Property Discovery{" "}
                    <span className="text-[#2043B0]">Honest and Simple</span>
                  </h3>
                  <p className="mt-4 leading-relaxed text-[#4B5563] font-sans">
                    Our mission is to build the most transparent, trustworthy, and accessible
                    property platform in India. We exist to remove the friction, opacity, and
                    anxiety that surrounds property decisions — and replace it with clarity,
                    confidence, and control for every user.
                  </p>
                  <p className="mt-4 leading-relaxed text-[#4B5563] font-sans">
                    We are building for the first-time buyer in a Tier-2 city who does not
                    know where to start. For the NRI investing from abroad who needs to trust
                    the data. For the young professional renting in a new city who just wants
                    a straightforward experience. Every product decision is made for them.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={subtleFadeUp}
                custom={0.1}
              >
                <div className="h-full rounded border border-[#E5E7EB] bg-white p-8 sm:p-9 shadow-xs">
                  <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                    <Compass className="h-4 w-4" />
                    Our Vision
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554]">
                    India&apos;s Most Trusted{" "}
                    <span className="text-[#2043B0]">Property Platform</span>
                  </h3>
                  <p className="mt-4 leading-relaxed text-[#4B5563] font-sans">
                    We envision a future where every property decision in India — from a studio
                    rental to a commercial investment — begins and ends on Mishti Spaces. Not
                    because we forced ourselves into the market, but because we earned the trust
                    of users through consistently superior experience and relentlessly honest
                    practices.
                  </p>
                  <p className="mt-4 leading-relaxed text-[#4B5563] font-sans">
                    In our vision, Mishti Spaces is not just a website or an app. It is the
                    infrastructure layer of Indian real estate — the platform that defines
                    what transparency, discovery, and trust look like in this industry for
                    the next generation of buyers and investors.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            9 · GOALS & FOCUS (White Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            {/* GOALS */}
            <SectionHeading
              badge="Goals"
              title="What We Are"
              highlight="Working Towards"
              description="Every goal we set is paired with a roadmap and a team committed to seeing it through — without cutting corners on quality or trust."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Multi-City Expansion",
                  desc: "Mishti Spaces will expand across 100+ cities in the near term, with hyperlocal content, regional language support, and on-ground verification teams in every major market — ensuring depth, not just width of coverage.",
                },
                {
                  num: "02",
                  title: "Superior User Experience",
                  desc: "Every quarter, our product team ships improvements driven entirely by user research. Faster load times, simpler flows, smarter onboarding — the product is never considered done as long as friction exists anywhere in the journey.",
                },
                {
                  num: "03",
                  title: "Smart Discovery Tools",
                  desc: "We are building intelligent tools — AI-assisted matching, neighbourhood scoring, investment potential calculators, and price trend visualisations — that help users make decisions based on real insight, not guesswork.",
                },
                {
                  num: "04",
                  title: "Faster, Simpler Search",
                  desc: "Our team is focused on reducing the time from first search to verified shortlist to under 10 minutes. Property search should feel as fast and intuitive as any great consumer app.",
                },
                {
                  num: "05",
                  title: "End-to-End Digital Transactions",
                  desc: "We are building towards a fully digital transaction pipeline — from offer to documentation to registration — that removes the need for physical paperwork entirely for eligible transactions.",
                },
                {
                  num: "06",
                  title: "Builder Ecosystem",
                  desc: "Onboarding India's top real estate developers to list new launches and pre-launch opportunities on Mishti Spaces, giving registered users early, verified access to premium projects before the wider market.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={i * 0.06}
                >
                  <CleanCard className="h-full flex flex-col bg-white">
                    <div className="mb-4 text-sm font-bold tracking-widest text-[#2043B0] font-[Cinzel]">
                      {item.num}
                    </div>
                    <h3 className="mb-2 text-lg font-[Cinzel] font-bold text-[#172554]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                      {item.desc}
                    </p>
                  </CleanCard>
                </motion.div>
              ))}
            </div>

            {/* FOCUS */}
            <div className="mt-20">
              <SectionHeading
                badge="Focus"
                title="Where We Put Our"
                highlight="Energy"
              />

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "User Experience Above All Else",
                    desc: "Every sprint and design cycle is evaluated through a single lens: does this improve the user's experience? We relentlessly remove friction from every touchpoint — search, contact, shortlist, transact — because the best platform feels effortless.",
                  },
                  {
                    title: "Data Quality and Listing Accuracy",
                    desc: "Stale listings are trust killers. Our team runs daily freshness audits, automated availability checks, and user-flagged review workflows to ensure that every listing on Mishti Spaces is current, accurate, and trustworthy at all times.",
                  },
                  {
                    title: "Education and Buyer Empowerment",
                    desc: "We are building India's most comprehensive free resource hub for property buyers — covering home loan guides, RERA explainers, neighbourhood reviews, first-time buyer checklists, and market trend reports. An informed buyer makes better decisions.",
                  },
                  {
                    title: "Sustainable, Quality-First Growth",
                    desc: "We grow with discipline. Rather than accumulating listings in cities where we cannot deliver quality, we go deep before going wide. Our expansion strategy prioritises verified depth in every market before moving to the next.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={subtleFadeUp}
                    custom={i * 0.08}
                  >
                    <CleanCard className="h-full border-l-4 border-l-[#2043B0] bg-[#F5F7FF]">
                      <h3 className="mb-3 text-lg font-[Cinzel] font-bold text-[#172554]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                        {item.desc}
                      </p>
                    </CleanCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10 · CORE VALUES (Light-Blue Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-[#F5F7FF] border-y border-[#E5E7EB]">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              badge="Core Values"
              title="Principles That"
              highlight="Define Us"
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Trust",
                  desc: "Trust is not a feature. It is the foundation on which every feature, every policy, and every user interaction at Mishti Spaces is built. We earn it by being consistent, honest, and user-first in every decision we make.",
                },
                {
                  title: "Transparency",
                  desc: "Open information creates confident decisions. We believe that every user deserves the complete picture — on pricing, ownership, availability, and platform operations — without having to ask for it.",
                },
                {
                  title: "Innovation",
                  desc: "The real estate industry has been resistant to technology for too long. We challenge the status quo with every product release — using AI, data, and thoughtful design to remove pain points that have existed for decades.",
                },
                {
                  title: "Integrity",
                  desc: "We do the right thing even when it is not the easy thing. We do not accept listings that fail our standards. We do not hide fees. We do not manipulate search results. Integrity is non-negotiable at every level.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={i * 0.08}
                >
                  <CleanCard className="h-full flex flex-col bg-white">
                    <div className="mb-4 h-1 w-8 rounded bg-[#2043B0]" />
                    <h3 className="mb-2 text-lg font-[Cinzel] font-bold text-[#172554]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                      {item.desc}
                    </p>
                  </CleanCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            11 · OUR TEAM (White Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              badge="Our Team"
              title="The Builders Behind"
              highlight="Every Feature"
              description="Mishti Spaces is built by a product-focused team of engineers, platform architects, and real estate thinkers — united by a shared obsession with making property discovery better. No politics. No fluff. Just great work."
            />

            {/* Engineering */}
            <div className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2043B0] font-[Cinzel]">
                  Engineering
                </span>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                >
                  <CleanCard highlight className="h-full flex flex-col border-blue-200">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2043B0] font-[Cinzel] font-bold text-white shadow-sm">
                      AD
                    </div>
                    <h3 className="text-lg font-[Cinzel] font-bold text-[#172554]">Akanshu Dutt</h3>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                      Full Stack Developer
                    </p>
                    <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                      Akanshu leads the entire technical vision and execution at Mishti Spaces.
                      He designed the platform architecture, leads the engineering team, and makes
                      the high-stakes technology decisions that define what the product can do.
                      With expertise spanning full-stack engineering, system design, and scalable
                      infrastructure, he ensures the platform performs reliably for every user across
                      every city.
                    </p>
                  </CleanCard>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={0.08}
                >
                  <CleanCard className="h-full flex flex-col">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-[#F5F7FF] font-[Cinzel] font-bold text-[#2043B0]">
                      SK
                    </div>
                    <h3 className="text-lg font-[Cinzel] font-bold text-[#172554]">Sonu Kumar Paswan</h3>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                      Backend Developer
                    </p>
                    <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                      Sonu drives the development of the platform&apos;s most critical user-facing features,
                      from the search engine to the property listing dashboard. His command of both
                      frontend and backend systems means he can own complete product features end-to-end
                      — and his attention to performance and code quality sets the engineering standard.
                    </p>
                  </CleanCard>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={subtleFadeUp}
                  custom={0.16}
                >
                  <CleanCard className="h-full flex flex-col">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-[#F5F7FF] font-[Cinzel] font-bold text-[#2043B0]">
                      FE
                    </div>
                    <h3 className="text-lg font-[Cinzel] font-bold text-[#172554]">Frontend Engineering</h3>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                      UI and Experience Engineers
                    </p>
                    <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                      A team of frontend engineers who own the visual and interactive layer of Mishti Spaces.
                      They translate design into production-grade, responsive, and accessible code using Next.js
                      and Tailwind CSS — ensuring that every user, on any device, gets an experience that feels
                      fast and intentional.
                    </p>
                  </CleanCard>
                </motion.div>
              </div>
            </div>

            {/* Product & Design */}
            <div className="mb-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2043B0] font-[Cinzel]">
                  Product and Design
                </span>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    initials: "PM",
                    name: "Product Team",
                    role: "Product Strategy and Management",
                    desc: "Our product team connects user needs with technical capability. They define the roadmap, prioritise the backlog, run user research, and ensure that every feature shipped moves the needle on trust, usability, and platform quality.",
                  },
                  {
                    initials: "DS",
                    name: "Design Studio",
                    role: "UX and Interface Design",
                    desc: "The design team owns the visual identity and user experience of the platform. From wireframes to final interfaces, they apply rigorous UX principles and continuous usability testing to create a product that is as beautiful as it is functional.",
                  },
                  {
                    initials: "QA",
                    name: "QA Engineering",
                    role: "Quality and Testing",
                    desc: "Our QA engineers run automated and manual test suites across every release cycle. They are the last line of defence before anything reaches a user — ensuring every deployment is stable, reliable, and regression-free.",
                  },
                ].map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={subtleFadeUp}
                    custom={i * 0.08}
                  >
                    <CleanCard className="h-full flex flex-col">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-[#F5F7FF] font-[Cinzel] font-bold text-[#2043B0]">
                        {member.initials}
                      </div>
                      <h3 className="text-lg font-[Cinzel] font-bold text-[#172554]">{member.name}</h3>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                        {member.role}
                      </p>
                      <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                        {member.desc}
                      </p>
                    </CleanCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Operations & Growth */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2043B0] font-[Cinzel]">
                  Operations and Growth
                </span>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    initials: "RE",
                    name: "Property Experts",
                    role: "Real Estate Advisory",
                    desc: "Certified real estate professionals who own the verification pipeline, advise users on market conditions, and ensure that all listings comply with RERA regulations and Mishti Spaces' own quality standards across every city.",
                  },
                  {
                    initials: "CS",
                    name: "Customer Success",
                    role: "Support and Relations",
                    desc: "A multilingual support team available around the clock for buyers, sellers, and renters. Their goal is not just resolution — it is genuine satisfaction and the confidence that comes from feeling supported through every step.",
                  },
                  {
                    initials: "GR",
                    name: "Growth and Partnerships",
                    role: "Marketing and Ecosystem",
                    desc: "The team building Mishti Spaces' presence across every market — through targeted digital campaigns, builder partnerships, and community-led initiatives that grow the platform through genuine value, not paid noise.",
                  },
                ].map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={subtleFadeUp}
                    custom={i * 0.08}
                  >
                    <CleanCard className="h-full flex flex-col">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-[#F5F7FF] font-[Cinzel] font-bold text-[#2043B0]">
                        {member.initials}
                      </div>
                      <h3 className="text-lg font-[Cinzel] font-bold text-[#172554]">{member.name}</h3>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#2043B0]">
                        {member.role}
                      </p>
                      <p className="text-sm leading-relaxed text-[#4B5563] flex-1 font-sans">
                        {member.desc}
                      </p>
                    </CleanCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            12 · FUTURE PLANS (Light-Blue Background)
        ══════════════════════════════════════════ */}
        <section className="relative px-6 py-20 sm:py-24 bg-[#F5F7FF] border-y border-[#E5E7EB]">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              badge="Future Plans"
              title="The Mishti Spaces of"
              highlight="Tomorrow"
              description="We are not building for the next quarter. We are building for the next decade — with technology choices and product decisions that compound in value."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: Sparkles,
                  title: "AI-Based Recommendations",
                  p1: "Our next-generation recommendation engine will use machine learning to understand each user's implicit preferences — not just what they searched for, but what they paused on, shortlisted, and ultimately chose — to surface properties they would not have found through search alone.",
                  p2: "We are also building natural language search that lets users describe what they want in plain terms — and surfaces results that match the full context of the request, not just individual keywords.",
                },
                {
                  icon: BarChart3,
                  title: "Smart Analytics Platform",
                  p1: "We are building a free public analytics layer covering price trends, rental yield benchmarks, neighbourhood appreciation rates, and infrastructure development impact on property values across every city we operate in.",
                  p2: "Buyers and investors will access market intelligence reports previously available only to institutions — democratising data that has historically given professionals an unfair advantage over individual buyers.",
                },
                {
                  icon: Globe2,
                  title: "Platform Expansion",
                  p1: "Our expansion strategy extends beyond Indian borders — to NRI communities across the world who want to invest in India with the same confidence and simplicity that domestic buyers enjoy, with multi-currency support and virtual tour integrations.",
                  p2: "Domestically, we are deepening Tier-2 and Tier-3 coverage with dedicated local teams, regional language interfaces, and market-specific features that make Mishti Spaces as powerful in Varanasi as it is in Bengaluru.",
                },
                {
                  icon: FileCheck2,
                  title: "End-to-End Transactions",
                  p1: "The ultimate vision is a completely digital, end-to-end property transaction — from offer to registration — requiring zero physical paperwork for eligible properties. We are working with legal and regulatory bodies to make this a reality within the next few years.",
                  p2: "This includes integrated home loan applications, digital escrow services, stamp duty management, and blockchain-verified ownership transfer — a complete reimagining of what closing a property deal can feel like in the modern era.",
                },
              ].map((plan, i) => {
                const Icon = plan.icon;
                return (
                  <motion.div
                    key={plan.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={subtleFadeUp}
                    custom={i * 0.08}
                  >
                    <CleanCard className="h-full bg-white">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2043B0]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-3 text-xl font-[Cinzel] font-bold text-[#172554]">
                        {plan.title}
                      </h3>
                      <p className="leading-relaxed text-[#4B5563] text-sm font-sans">{plan.p1}</p>
                      <p className="mt-3 leading-relaxed text-[#4B5563] text-sm font-sans">{plan.p2}</p>
                    </CleanCard>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFadeUp}
              className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs"
            >
              <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
                {[
                  { value: "250+", label: "Target Cities by 2028" },
                  { value: "5L+", label: "Listings Target" },
                  { value: "10M+", label: "Users Served" },
                ].map((s) => (
                  <div key={s.label} className="p-2">
                    <p className="text-3xl sm:text-4xl font-[Cinzel] font-bold text-[#2043B0]">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#172554]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            13 · CALL TO ACTION (Clean White & Blue, No Image)
        ══════════════════════════════════════════ */}
        <section id="explore" className="relative bg-[#2043B0] text-white overflow-hidden px-6 py-24 sm:py-32 text-center">
          {/* Subtle blue ambient circle decoration only (No image) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={subtleFadeUp}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-100 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>Start Today</span>
              </div>

              <h2 className="mt-5 text-3xl sm:text-5xl md:text-6xl font-[Cinzel] font-bold text-white tracking-tight leading-tight">
                Your Dream Home <span className="text-blue-200">Is Waiting</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-blue-100 leading-relaxed font-sans">
                Whether you are searching for your first home, listing a property, or
                exploring what the market looks like — Mishti Spaces is the platform built
                to make that journey simpler, faster, and more trustworthy than anything
                you have experienced before.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/properties"
                  className="bg-white hover:bg-gray-100 transition px-8 py-3.5 rounded-xl text-[#2043B0] font-semibold text-base inline-flex items-center gap-2 shadow-sm"
                >
                  Explore Properties <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/properties"
                  className="border border-white/40 hover:bg-white/10 transition px-8 py-3.5 rounded-xl text-white font-semibold text-base inline-flex items-center gap-2"
                >
                  Start Your Search
                </Link>
              </div>

              <div className="mx-auto mt-14 grid max-w-md grid-cols-3 gap-4 border-t border-white/20 pt-8">
                {[
                  { v: "< 2 hrs", l: "Response Time", icon: Clock },
                  { v: "30+", l: "Cities", icon: MapPin },
                  { v: "24×7", l: "Support", icon: Headphones },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.l} className="text-center">
                      <Icon className="mx-auto mb-1.5 h-5 w-5 text-blue-200" />
                      <p className="text-xl sm:text-2xl font-[Cinzel] font-bold text-white">{s.v}</p>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-blue-100">
                        {s.l}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}