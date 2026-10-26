"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowDown } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATION VARIANTS (Matching About Us Page: Subtle & Smooth)
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
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-[#F5F7FF] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
      <span>{text}</span>
    </div>
  );
}

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Hybrid Workspaces in 2026",
      slug: "rise-of-hybrid-workspaces-2026",
      excerpt:
        "Discover how hybrid office models are reshaping commercial real estate and what it means for businesses in major cities.",
      date: "June 2, 2026",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop", // Modern office interior
      category: "Office Trends",
    },
    {
      id: 2,
      title: "Sustainable Office Design: Green Buildings That Inspire",
      slug: "sustainable-office-design-green-buildings",
      excerpt:
        "Explore eco-friendly office spaces featuring biophilic design, solar integration, and LEED-certified architecture.",
      date: "May 28, 2026",
      readTime: "12 min read",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop", // Bright sustainable office
      category: "Sustainability",
    },
    {
      id: 3,
      title: "Premium Coworking Spaces: Luxury Meets Productivity",
      slug: "premium-coworking-spaces-luxury-productivity",
      excerpt:
        "A deep dive into high-end coworking environments that blend comfort, community, and cutting-edge amenities.",
      date: "May 20, 2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop", // Stylish coworking space
      category: "Coworking",
    },
    {
      id: 4,
      title: "Tech-Enabled Offices: Smart Spaces for Modern Teams",
      slug: "tech-enabled-offices-smart-spaces-modern-teams",
      excerpt:
        "From AI-powered climate control to seamless video conferencing — the technology transforming office environments.",
      date: "May 15, 2026",
      readTime: "10 min read",
      image: "https://picsum.photos/id/201/800/600", // Futuristic tech office
      category: "Technology",
    },
    {
      id: 5,
      title: "Finding the Perfect Office Space for Startups",
      slug: "finding-perfect-office-space-for-startups",
      excerpt:
        "Key considerations when choosing flexible office solutions for growing teams and bootstrapped businesses.",
      date: "May 10, 2026",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop", // Open collaborative office
      category: "Startups",
    },
    {
      id: 6,
      title: "Wellness-First Workplaces: Designing for Employee Health",
      slug: "wellness-first-workplaces-designing-for-employee-health",
      excerpt:
        "How leading companies are incorporating meditation rooms, fitness centers, and natural light to boost productivity.",
      date: "May 5, 2026",
      readTime: "9 min read",
      image: "https://picsum.photos/id/160/800/600", // Bright wellness-focused office
      category: "Office Design",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <main className="min-h-screen bg-white text-[#172554] antialiased selection:bg-[#2043B0] selection:text-white">
        {/* ══════════════════════════════════════════
            HERO SECTION (White & Light-Blue Palette)
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-white to-white px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 text-center border-b border-[#E5E7EB]">
          {/* Subtle blue ambient decorative shapes only (No image) */}
          <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 h-[340px] w-[650px] rounded-full bg-[#2043B0]/5 blur-3xl" />
          <div className="pointer-events-none absolute right-[10%] top-10 h-44 w-44 rounded-full bg-blue-100/40 blur-2xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex justify-center"
            >
              <PillBadge text="MISHTI SPACES INSIGHTS" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-[Cinzel] font-bold leading-tight tracking-tight text-[#172554]"
            >
              Our <span className="text-[#2043B0]">Blog</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeInOut" }}
              className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-[#4B5563] leading-relaxed font-sans"
            >
              Expert insights, trends, and guides on commercial real estate, office
              spaces, and workspace innovation.
            </motion.p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BLOG ARTICLES GRID SECTION
        ══════════════════════════════════════════ */}
        <section className="relative bg-white px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={subtleFadeUp}
                  custom={i * 0.08}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col h-full rounded-xl bg-white border border-[#E5E7EB] hover:border-blue-300 shadow-xs hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center rounded-full border border-blue-100 bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-[#2043B0] shadow-xs backdrop-blur-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Metadata */}
                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#4B5563]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#2043B0]" />
                        {post.date}
                      </span>
                      <span className="text-[#94A3B8]">•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#2043B0]" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-[Cinzel] text-xl font-bold leading-snug text-[#172554] group-hover:text-[#2043B0] transition-colors duration-200 line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Description / Excerpt */}
                    <p className="mb-6 flex-1 text-sm sm:text-[15px] leading-relaxed text-[#4B5563] line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read Article Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#2043B0] group/link hover:text-blue-800 transition-colors self-start"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* ══════════════════════════════════════════
                LOAD MORE ARTICLES BUTTON
            ══════════════════════════════════════════ */}
            <div className="mt-14 sm:mt-16 flex justify-center">
              <button
                type="button"
                className="bg-[#2043B0] hover:bg-blue-700 text-white font-semibold text-sm px-8 py-3.5 rounded-lg inline-flex items-center gap-2.5 shadow-sm shadow-blue-900/15 transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                <span>Load More Articles</span>
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}