import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Quote,
  Building2,
} from "lucide-react";
import { blogPosts, BlogPost } from "@/data/blog";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Mishti Spaces Insights",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${post.title} | Mishti Spaces Insights`,
    description: post.description || post.excerpt,
    openGraph: {
      title: `${post.title} | Mishti Spaces`,
      description: post.description || post.excerpt,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;

  // Identify the correct article using blogPosts.find((post) => post.slug === slug)
  const post: BlogPost | undefined = blogPosts.find(
    (item) => item.slug === slug
  );

  // If not found, show standard Next.js 404 page
  if (!post) {
    notFound();
  }

  // Related posts for the "Related Insights" section
  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <main className="min-h-screen bg-white text-[#172554] antialiased selection:bg-[#2043B0] selection:text-white">
        {/* ══════════════════════════════════════════
            HEADER & BREADCRUMB SECTION
        ══════════════════════════════════════════ */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-white to-white border-b border-[#E5E7EB] pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8">
          {/* Subtle Ambient Decorative Shapes */}
          <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 h-[340px] w-[650px] rounded-full bg-[#2043B0]/5 blur-3xl" />
          <div className="pointer-events-none absolute right-[10%] top-10 h-44 w-44 rounded-full bg-blue-100/40 blur-2xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            {/* Top Navigation & Back Button */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2043B0] hover:text-blue-800 transition-colors py-1 cursor-pointer group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Back to All Articles</span>
              </Link>

              {/* Breadcrumb path */}
              <div className="flex items-center gap-2 text-xs text-[#4B5563] font-medium">
                <Link href="/" className="hover:text-[#2043B0] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/insights"
                  className="hover:text-[#2043B0] transition-colors"
                >
                  Insights
                </Link>
                <span>/</span>
                <span className="text-[#172554] truncate max-w-[180px] sm:max-w-[260px]">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Category Pill Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-[#F5F7FF]
               px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#2043B0] shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                <span>{post.category}</span>
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Cinzel] font-bold tracking-tight text-[#172554] leading-[1.2] mb-6">
              {post.title}
            </h1>

            {/* Article Description / Lead Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#4B5563] leading-relaxed font-sans mb-8">
              {post.description || post.excerpt}
            </p>

            {/* Metadata Bar: Author, Date, Reading Time */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5E7EB]">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden border-2 border-blue-200 shadow-xs bg-blue-50 shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-[#172554]">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-[#4B5563]">
                    {post.author.role}
                  </div>
                </div>
              </div>

              {/* Date and Read Time Badges */}
              <div className="flex items-center gap-4 text-xs sm:text-sm font-medium text-[#4B5563]">
                <div className="inline-flex items-center gap-1.5 bg-[#F5F7FF] px-3 py-1.5 rounded-lg border border-blue-100/80">
                  <Calendar className="h-4 w-4 text-[#2043B0]" />
                  <span>{post.date}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-[#F5F7FF] px-3 py-1.5 rounded-lg border border-blue-100/80">
                  <Clock className="h-4 w-4 text-[#2043B0]" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            ARTICLE FEATURED IMAGE & BODY CONTENT
        ══════════════════════════════════════════ */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Featured Image */}
          <div className="relative w-full h-[280px] xs:h-[340px] sm:h-[440px] md:h-[520px] rounded
          overflow-hidden border border-[#E5E7EB] shadow-md mb-10 sm:mb-14 bg-slate-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            {/* Top Right Subtle Watermark Badge */}
            <div className="absolute top-4 right-4 z-10 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-[#2043B0] shadow-xs backdrop-blur-xs border border-blue-100">
              <Building2 className="w-3.5 h-3.5" />
              <span>Mishti Spaces Research</span>
            </div>
          </div>

          {/* Lead Paragraph */}
          <div className="rounded-2xl border-l-4 border-[#2043B0] bg-[#F5F7FF] p-5 sm:p-7 mb-10 shadow-xs">
            <p className="text-base sm:text-lg leading-relaxed text-[#172554] font-medium font-sans">
              {post.content.lead}
            </p>
          </div>

          {/* Structured Article Sections */}
          <article className="space-y-10 sm:space-y-12">
            {post.content.sections.map((section, idx) => (
              <section key={idx} className="space-y-5">
                {/* Section Heading */}
                <h2 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-snug">
                  {section.heading}
                </h2>

                {/* Section Paragraphs */}
                <div className="space-y-4">
                  {section.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base sm:text-lg leading-relaxed text-[#4B5563] font-sans"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Key Takeaways Box (if present) */}
                {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                  <div className="my-6 rounded border border-blue-200 bg-[#F5F7FF] p-6 shadow-xs">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#2043B0] mb-3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#2043B0]" />
                      Key Insights
                    </h3>
                    <ul className="space-y-2.5">
                      {section.keyTakeaways.map((item, tIdx) => (
                        <li
                          key={tIdx}
                          className="flex items-start gap-2.5 text-sm sm:text-base text-[#172554] font-sans"
                        >
                          <CheckCircle2 className="h-5 w-5 text-[#2043B0] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pull Quote (if present) */}
                {section.quote && (
                  <div className="my-8 rounded border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs relative">
                    <Quote className="h-10 w-10 text-blue-100 absolute top-4 right-4 pointer-events-none" />
                    <blockquote className="text-lg sm:text-xl font-[Cinzel] italic font-semibold text-[#172554] leading-relaxed mb-3">
                      &ldquo;{section.quote.text}&rdquo;
                    </blockquote>
                    <cite className="block text-xs sm:text-sm font-semibold text-[#2043B0] uppercase tracking-wider not-italic">
                      — {section.quote.author}
                    </cite>
                  </div>
                )}
              </section>
            ))}
          </article>

          {/* Article Footer & Author Signature */}
          <div className="mt-14 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-blue-200 bg-blue-50 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2043B0]">
                  Written by
                </span>
                <h4 className="text-lg font-bold text-[#172554] font-[Cinzel]">
                  {post.author.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5563]">
                  {post.author.role} · Mishti Spaces Editorial
                </p>
              </div>
            </div>

            {/* Back to top or back to insights CTA */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/insights"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F5F7FF] hover:border-blue-300 text-sm font-semibold text-[#172554] transition-all cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Insights</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                 bg-[#2043B0] hover:bg-blue-700 text-sm font-semibold text-white transition-all cursor-pointer shadow-sm shadow-blue-900/15"
              >
                <span>Consult an Expert</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            RELATED ARTICLES SECTION
        ══════════════════════════════════════════ */}
        <section className="bg-[#F5F7FF] border-t border-[#E5E7EB] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#2043B0] shadow-xs mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                  Keep Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
                  Related Insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2043B0] hover:text-blue-800 transition-colors cursor-pointer group"
              >
                <span>View All Articles</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  className="group flex flex-col h-full rounded bg-white border border-[#E5E7EB] hover:border-blue-300 shadow-xs hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center rounded-full border border-blue-100 bg-white/95 px-3 py-1 text-xs font-semibold tracking-wide text-[#2043B0] shadow-xs backdrop-blur-xs">
                        {related.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2.5 flex items-center gap-2 text-xs font-medium text-[#4B5563]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#2043B0]" />
                        {related.date}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#2043B0]" />
                        {related.readTime}
                      </span>
                    </div>

                    <h3 className="mb-2.5 font-[Cinzel] text-lg font-bold leading-snug text-[#172554] group-hover:text-[#2043B0] transition-colors duration-200 line-clamp-2">
                      <Link href={`/insights/${related.slug}`}>
                        {related.title}
                      </Link>
                    </h3>

                    <p className="mb-5 flex-1 text-sm leading-relaxed text-[#4B5563] line-clamp-2">
                      {related.excerpt}
                    </p>

                    <Link
                      href={`/insights/${related.slug}`}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#2043B0] group/link hover:text-blue-800 transition-colors self-start"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

