"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, X } from "lucide-react";

const Sidebar = ({ property }: { property: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Main Sidebar Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs hover:border-blue-200 hover:shadow-md transition-all duration-300 p-6 sm:p-7 sticky top-20 font-sans">
        {/* Price Section */}
        <div className="mb-5 pb-5 border-b border-[#E5E7EB]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563] block mb-1">
            Price
          </span>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-[Cinzel] font-bold text-[#2043B0] tracking-tight">
              ₹{property?.price?.toLocaleString("en-IN") || "1.25 Crore"}
            </h2>
            {property?.listingType === "rent" && (
              <span className="text-sm font-medium text-[#4B5563]">
                per month
              </span>
            )}
          </div>
        </div>

        {/* Property Title */}
        <div className="mb-6">
          <p className="text-lg sm:text-xl font-[Cinzel] font-bold text-[#172554] tracking-tight leading-snug break-words">
            {property?.title || "Premium 3 BHK Apartment"}
          </p>
        </div>

        {/* Contact Information Card */}
        <div className="p-4 rounded-xl bg-[#F5F7FF] border border-[#E5E7EB] space-y-4 mb-6">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#2043B0] mt-0.5">
              <MapPin size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-[#172554] break-words">
                {property?.location?.address || "Sector 63, Noida"}
              </p>
              <p className="text-xs text-[#4B5563] mt-0.5">
                {property?.location?.city}, {property?.location?.state}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#2043B0]">
              <Phone size={16} />
            </div>
            <span className="font-semibold text-sm text-[#172554]">
              +91 8745875061
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#2043B0]">
              <Mail size={16} />
            </div>
            <span className="font-semibold text-sm text-[#172554] break-all">
              info@mishtispaces.com
            </span>
          </div>
        </div>

        {/* Primary Action: Contact Agent */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm shadow-blue-900/20 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2043B0]/40 text-sm sm:text-base"
        >
          Contact Agent
        </button>

        {/* Secondary Action: Schedule Visit */}
        <button
          type="button"
          className="w-full mt-3 bg-white hover:bg-[#F5F7FF] active:bg-blue-50 text-[#172554] hover:text-[#2043B0] hover:border-blue-300 font-semibold py-3.5 px-4 rounded-xl border border-[#E5E7EB] transition-all duration-200 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2043B0]/30 shadow-2xs text-sm sm:text-base"
        >
          Schedule Visit
        </button>
      </div>

      {/* Contact Modal */}
      {open && (
        <div className="fixed inset-0 bg-[#172554]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#E5E7EB] shadow-xl p-6 sm:p-7 my-8 max-h-[90vh] overflow-y-auto font-sans">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-lg text-[#4B5563] hover:text-[#172554] hover:bg-[#F5F7FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2043B0]/30"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Heading & Description */}
            <h2 className="text-xl sm:text-2xl font-[Cinzel] font-bold text-[#172554] tracking-tight">
              Contact Agent
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1.5 mb-6">
              Fill in your details and our agent will contact you shortly.
            </p>

            {/* Modal Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs sm:text-sm font-semibold text-[#172554] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2.5 bg-white text-[#172554] placeholder-[#4B5563]/60 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="emailAddress"
                  className="block text-xs sm:text-sm font-semibold text-[#172554] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 bg-white text-[#172554] placeholder-[#4B5563]/60 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-xs sm:text-sm font-semibold text-[#172554] mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-3.5 py-2.5 bg-white text-[#172554] placeholder-[#4B5563]/60 text-sm border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#2043B0] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 active:scale-[0.98] shadow-sm shadow-blue-900/20 hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2043B0]/40 text-sm sm:text-base"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;