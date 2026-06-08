// app/blog/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Hybrid Workspaces in 2026",
      slug: "rise-of-hybrid-workspaces-2026",
      excerpt: "Discover how hybrid office models are reshaping commercial real estate and what it means for businesses in major cities.",
      date: "June 2, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop", // Modern office interior
      category: "Office Trends"
    },
    {
      id: 2,
      title: "Sustainable Office Design: Green Buildings That Inspire",
        slug: "sustainable-office-design-green-buildings",
      excerpt: "Explore eco-friendly office spaces featuring biophilic design, solar integration, and LEED-certified architecture.",
      date: "May 28, 2026",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop", // Bright sustainable office
      category: "Sustainability"
    },
    {
      id: 3,
      title: "Premium Coworking Spaces: Luxury Meets Productivity",
        slug: "premium-coworking-spaces-luxury-productivity",
      excerpt: "A deep dive into high-end coworking environments that blend comfort, community, and cutting-edge amenities.",
      date: "May 20, 2026",
      readTime: "6 min read",
      image:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop", // Stylish coworking space
      category: "Coworking"
    },
    {
      id: 4,
      title: "Tech-Enabled Offices: Smart Spaces for Modern Teams",
        slug: "tech-enabled-offices-smart-spaces-modern-teams",
      excerpt: "From AI-powered climate control to seamless video conferencing — the technology transforming office environments.",
      date: "May 15, 2026",
      readTime: "10 min read",
      image: "https://picsum.photos/id/201/800/600", // Futuristic tech office
      category: "Technology"
    },
    {
      id: 5,
      title: "Finding the Perfect Office Space for Startups",
        slug: "finding-perfect-office-space-for-startups",
      excerpt: "Key considerations when choosing flexible office solutions for growing teams and bootstrapped businesses.",
      date: "May 10, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&h=600&fit=crop", // Open collaborative office
      category: "Startups"
    },
    {
      id: 6,
      title: "Wellness-First Workplaces: Designing for Employee Health",
        slug: "wellness-first-workplaces-designing-for-employee-health",
      excerpt: "How leading companies are incorporating meditation rooms, fitness centers, and natural light to boost productivity.",
      date: "May 5, 2026",
      readTime: "9 min read",
      image: "https://picsum.photos/id/160/800/600", // Bright wellness-focused office
      category: "Office Design"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              MISHTI SPACES INSIGHTS
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 mb-4">
              Our Blog
            </h1>
            <p className="max-w-2xl text-xl text-zinc-600">
              Expert insights, trends, and guides on commercial real estate, 
              office spaces, and workspace innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full text-zinc-700">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-7 flex flex-col">
                <div className="text-xs text-zinc-500 mb-3">
                  {post.date} • {post.readTime}
                </div>
                
                <h3 className="font-semibold text-2xl leading-tight text-zinc-900 mb-4 line-clamp-3 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-zinc-600 text-[15.5px] leading-relaxed mb-8 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 group-hover:gap-3 transition-all self-start mt-auto"
                >
                  Read Article
                  <span className="text-base">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-4 bg-zinc-900 hover:bg-black text-white rounded-2xl font-medium transition-colors flex items-center gap-3 text-sm uppercase tracking-widest">
            Load More Articles
            <span className="text-xl">↓</span>
          </button>
        </div>
      </div>

      
    </div>
  );
}