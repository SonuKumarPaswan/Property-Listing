"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface UserProfile {
  id?: string;
  _id?: string;
  username?: string;
  email?: string;
  role?: "user" | "owner" | "agent" | string;
  [key: string]: unknown;
}

interface PropertyItem {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  price?: number | string;
  priceUnit?: string;
  status?: string;
  location?: {
    city?: string;
    state?: string;
    address?: string;
  };
  details?: {
    bedrooms?: number;
    bathrooms?: number;
    area?: number | string;
  };
  images?: { url: string; public_id?: string }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [myProperties, setMyProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
      return;
    }

    (async () => {
      try {
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData: UserProfile = res.data;
        setUser(userData);

        // Fetch real properties for owner and agent
        if (userData.role === "owner" || userData.role === "agent") {
          try {
            const propRes = await api.get("/properties/my", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (propRes.data?.data) {
              setMyProperties(propRes.data.data);
            }
          } catch (propErr) {
            console.error("Failed to load user listings:", propErr);
          }
        }
      } catch {
        localStorage.removeItem("token");
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7FF] gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-blue-200 border-t-[#2043B0] animate-spin" />
        <p className="text-sm text-[#4B5563] font-medium tracking-wide">
          Loading your dashboard…
        </p>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isOwnerOrAgent = user?.role === "owner" || user?.role === "agent";

  // Dynamic role-based navigation
  const navItems = isOwnerOrAgent
    ? [
      { id: "listings", icon: "🏠", label: "My Listings" },
      { id: "messages", icon: "💬", label: "Inquiries", badge: 0 },
      { id: "analytics", icon: "📊", label: "Analytics" },
      { id: "favorites", icon: "♥", label: "Saved" },
      { id: "settings", icon: "⚙", label: "Settings" },
    ]
    : [
      { id: "explore", icon: "🔍", label: "Browse Homes" },
      { id: "favorites", icon: "♥", label: "Saved Properties" },
      { id: "messages", icon: "💬", label: "My Inquiries" },
      { id: "settings", icon: "⚙", label: "Settings" },
    ];

  // Dynamic role-based statistics
  const stats = isOwnerOrAgent
    ? [
      {
        label: "Total Listings",
        value: myProperties.length.toString(),
        icon: "🏠",
        delta: user?.role === "owner" ? "Property Owner" : "Verified Agent",
      },
      {
        label: "Active Listings",
        value: myProperties.filter((p) => p.status === "available" || !p.status).length.toString(),
        icon: "👁️",
        delta: "Published",
      },
      {
        label: "Inquiries Received",
        value: "0",
        icon: "💬",
        delta: "New today",
      },
      {
        label: "Account Status",
        value: "Active",
        icon: "🛡️",
        delta: "Verified",
      },
    ]
    : [
      {
        label: "Account Type",
        value: "Buyer",
        icon: "👤",
        delta: "Tenant / Buyer",
      },
      {
        label: "Saved Properties",
        value: "0",
        icon: "♥",
        delta: "Favorites",
      },
      {
        label: "Inquiries Sent",
        value: "0",
        icon: "💬",
        delta: "Messages",
      },
      {
        label: "Explore",
        value: "12K+",
        icon: "🔍",
        delta: "Verified properties",
      },
    ];

  // Filter user properties
  const filteredProperties = myProperties.filter((prop) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return prop.status === "available" || !prop.status;
    if (activeFilter === "Sold") return prop.status === "sold";
    if (activeFilter === "Rented") return prop.status === "pending";
    return true;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="min-h-screen bg-[#F5F7FF] text-[#172554] font-sans antialiased selection:bg-[#2043B0] selection:text-white flex">
        {/* Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-[#172554]/40 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ═════════════════════════════════════════════════════════════════════
            SIDEBAR (Clean White & Blue Identity)
        ═════════════════════════════════════════════════════════════════════ */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-40 h-screen w-64
            flex flex-col bg-white border-r border-[#E5E7EB] shadow-xs
            px-4 py-6 transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Brand Logo & Close Button (Mobile) */}
          <div className="flex items-center justify-between px-2 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#2043B0] flex items-center justify-center text-white shadow-xs">
                <span className="text-lg font-bold">🏢</span>
              </div>
              <div>
                <span className="text-lg font-bold font-[Cinzel] text-[#172554] tracking-tight block leading-tight">
                  Mishti Spaces
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-[#2043B0] block">
                  Real Estate Platform
                </span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#4B5563] hover:text-[#172554] p-1.5 rounded-lg hover:bg-[#F5F7FF] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                    if (item.id === "explore") router.push("/properties");
                    if (item.id === "favorites") router.push("/wishlist");
                    if (item.id === "messages") router.push("/enquiries");
                  }}
                  className={`
                    relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold
                    w-full text-left transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-[#2043B0] text-white shadow-xs shadow-blue-900/15"
                        : "text-[#4B5563] hover:bg-[#F5F7FF] hover:text-[#2043B0]"
                    }
                  `}
                >
                  <span className="w-5 text-center text-base shrink-0">{item.icon}</span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {Boolean(item.badge) && (
                    <span
                      className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${
                        isActive
                          ? "bg-white text-[#2043B0]"
                          : "bg-[#F5F7FF] border border-blue-200 text-[#2043B0]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="pt-4 border-t border-[#E5E7EB] mt-auto">
            <div className="flex items-center gap-3 bg-[#F5F7FF] border border-[#E5E7EB] rounded-xl p-3">
              <div className="w-10 h-10 rounded-xl bg-[#2043B0] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                {user?.username?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#172554] truncate">
                  {user?.username}
                </p>
                <p className="text-[11px] font-medium text-[#4B5563] truncate">
                  {user?.role === "owner"
                    ? "Property Owner"
                    : user?.role === "agent"
                    ? "Real Estate Agent"
                    : "Buyer / Tenant"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="h-8 w-8 rounded-lg text-[#4B5563] hover:text-red-600 hover:bg-red-50 flex items-center justify-center text-base transition-colors cursor-pointer shrink-0"
                aria-label="Logout"
              >
                ⇥
              </button>
            </div>
          </div>
        </aside>

        {/* ═════════════════════════════════════════════════════════════════════
            MAIN DASHBOARD AREA (Spacious White-and-Blue Layout)
        ═════════════════════════════════════════════════════════════════════ */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 overflow-y-auto">
          {/* Dashboard Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E5E7EB]">
            <div className="flex items-start gap-3">
              <button
                className="lg:hidden mt-0.5 p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#172554] hover:bg-[#F5F7FF] hover:border-blue-200 shadow-xs transition-colors cursor-pointer shrink-0"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar menu"
              >
                ☰
              </button>
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#2043B0] mb-2 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
                  <span>
                    {user?.role === "owner"
                      ? "Property Owner Portal"
                      : user?.role === "agent"
                      ? "Agent Portal"
                      : "Buyer & Tenant Portal"}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
                  Good morning, {user?.username} 👋
                </h1>
                <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                  {user?.email} · {today}
                </p>
              </div>
            </div>

            {/* Header Action Button */}
            {isOwnerOrAgent ? (
              <button
                onClick={() => router.push("/add-property")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2043B0] hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-900/15 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>+ Add Listing</span>
              </button>
            ) : (
              <button
                onClick={() => router.push("/properties")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2043B0] hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-900/15 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Browse Properties →</span>
              </button>
            )}
          </header>

          {/* Statistics Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 flex items-start gap-4"
              >
                <div className="h-12 w-12 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center text-xl shrink-0">
                  {s.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] leading-tight">
                    {s.value}
                  </p>
                  <p className="text-xs font-semibold text-[#4B5563] mt-1 truncate">
                    {s.label}
                  </p>
                  <p className="text-[11px] font-medium text-[#2043B0] mt-0.5 truncate">
                    {s.delta}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Main Content Area */}
          {isOwnerOrAgent ? (
            <>
              {/* Listings Header & Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#172554]">
                    Your Property Listings
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                    {myProperties.length} total properties registered under your account
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-[#E5E7EB] shadow-2xs self-start sm:self-auto overflow-x-auto">
                  {["All", "Active", "Sold", "Rented"].map((f) => {
                    const isSelected = activeFilter === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? "bg-[#2043B0] text-white shadow-xs"
                            : "text-[#4B5563] hover:text-[#2043B0] hover:bg-[#F5F7FF]"
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Property Cards Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {filteredProperties.map((p) => {
                  const imgUrl =
                    p.images?.[0]?.url ||
                    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80";
                  const displayPrice =
                    typeof p.price === "number"
                      ? `₹${p.price.toLocaleString("en-IN")}`
                      : p.price || "₹0";

                  return (
                    <div
                      key={p._id}
                      className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col group"
                    >
                      {/* Property Image Container */}
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F5F7FF]">
                        <Image
                          src={imgUrl}
                          alt={p.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#2043B0] shadow-xs backdrop-blur-xs">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              p.status === "sold" ? "bg-red-500" : "bg-[#2043B0]"
                            }`}
                          />
                          <span className="capitalize">{p.status || "available"}</span>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#2043B0] mb-1">
                            {p.type || "Property"}
                          </p>
                          <h3 className="text-base sm:text-lg font-[Cinzel] font-bold text-[#172554] mb-2 line-clamp-1 group-hover:text-[#2043B0] transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#2043B0] mb-3">
                            {displayPrice}
                            {p.priceUnit === "per_month" && (
                              <span className="text-xs font-normal text-[#4B5563]"> /mo</span>
                            )}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-[#4B5563] mb-4 pb-3 border-t border-b border-[#E5E7EB] pt-3">
                            <span>🛏 {p.details?.bedrooms || 0} Beds</span>
                            <span>•</span>
                            <span>🚿 {p.details?.bathrooms || 0} Baths</span>
                            <span>•</span>
                            <span>
                              📐 {p.details?.area ? `${p.details.area} sqft` : p.location?.city || "India"}
                            </span>
                          </div>
                        </div>

                        {/* View Action */}
                        <button
                          onClick={() => router.push(`/properties/${p.slug}`)}
                          className="w-full py-2.5 rounded-xl bg-[#F5F7FF] hover:bg-[#2043B0] text-[#2043B0] hover:text-white border border-blue-200 hover:border-[#2043B0] text-xs font-semibold transition-all duration-200 cursor-pointer text-center"
                        >
                          View Listing →
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Add New Listing Card (Dashed) */}
                <div
                  onClick={() => router.push("/add-property")}
                  className="rounded-2xl border-2 border-dashed border-blue-200 bg-white p-6 min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center text-center cursor-pointer group hover:bg-[#F5F7FF] hover:border-[#2043B0] transition-all duration-200 shadow-xs"
                >
                  <div className="h-14 w-14 rounded-2xl bg-[#F5F7FF] group-hover:bg-[#2043B0] border border-blue-200 group-hover:border-[#2043B0] text-[#2043B0] group-hover:text-white flex items-center justify-center text-2xl font-bold mb-3.5 transition-all duration-200 shadow-xs">
                    +
                  </div>
                  <p className="text-base font-bold text-[#172554] font-[Cinzel] group-hover:text-[#2043B0] transition-colors">
                    Add New Listing
                  </p>
                  <p className="text-xs text-[#4B5563] mt-1 max-w-xs leading-relaxed">
                    Publish a new residential or commercial property
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* Buyer / Tenant Dashboard View */
            <section className="space-y-6">
              {/* Welcome Card */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 lg:p-10 text-center shadow-xs">
                <div className="h-16 w-16 rounded-2xl bg-[#F5F7FF] border border-blue-200 text-[#2043B0] flex items-center justify-center mx-auto mb-5 text-3xl shadow-xs">
                  🏠
                </div>
                <h2 className="text-2xl sm:text-3xl font-[Cinzel] font-bold text-[#172554] mb-3">
                  Welcome to Mishti Spaces Buyer & Tenant Portal
                </h2>
                <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl mx-auto mb-8 leading-relaxed">
                  As a buyer or tenant, you have access to verified real estate listings across India.
                  Save your favorite properties, schedule visits, and connect directly with verified property owners and agents.
                </p>

                <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
                  <button
                    onClick={() => router.push("/properties")}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2043B0] hover:bg-blue-700 text-white font-semibold text-sm shadow-sm shadow-blue-900/15 transition-all duration-200 cursor-pointer"
                  >
                    Explore All Properties
                  </button>
                  <button
                    onClick={() => router.push("/wishlist")}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-[#F5F7FF] text-[#2043B0] border border-blue-200 hover:border-blue-300 font-semibold text-sm transition-all duration-200 cursor-pointer"
                  >
                    View Saved Properties
                  </button>
                </div>
              </div>

              {/* Buyer Quick Action Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                <div
                  onClick={() => router.push("/properties/rent")}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center text-xl mb-3 text-[#2043B0]">
                    🔑
                  </div>
                  <h3 className="text-base font-bold font-[Cinzel] text-[#172554] group-hover:text-[#2043B0] transition-colors">
                    Properties for Rent
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-relaxed">
                    Discover furnished apartments and modern villas for rent.
                  </p>
                </div>

                <div
                  onClick={() => router.push("/properties/buy")}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center text-xl mb-3 text-[#2043B0]">
                    🏡
                  </div>
                  <h3 className="text-base font-bold font-[Cinzel] text-[#172554] group-hover:text-[#2043B0] transition-colors">
                    Properties for Sale
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-relaxed">
                    Invest in luxury apartments, independent floors, and plots.
                  </p>
                </div>

                <div
                  onClick={() => router.push("/contact")}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#F5F7FF] border border-blue-100 flex items-center justify-center text-xl mb-3 text-[#2043B0]">
                    💬
                  </div>
                  <h3 className="text-base font-bold font-[Cinzel] text-[#172554] group-hover:text-[#2043B0] transition-colors">
                    Contact Advisory Team
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-relaxed">
                    Get personalized property recommendations from our specialists.
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
