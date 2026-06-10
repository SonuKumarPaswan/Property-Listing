"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, X } from "lucide-react";

const Sidebar = ({ property }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl hover:shadow-lg p-6 sticky top-12 border">
        <div className="mb-6">
          <h2 className="text-4xl font-bold text-blue-600">
            ₹{property?.price?.toLocaleString("en-IN") || "1.25 Crore"}
          </h2>
          <p className="text-gray-500 mt-1">
            {property?.listingType === "rent" ? "per month" : ""}
          </p>
        </div>

        <p className="text-xl font-semibold mb-6 text-gray-500">
          {property?.title || "Premium 3 BHK Apartment"}
        </p>

        <div className="space-y-5 text-gray-600">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1" size={20} />
            <div>
              <p>{property?.location?.address || "Sector 63, Noida"}</p>
              <p className="text-sm">
                {property?.location?.city}, {property?.location?.state}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} />
            <span>+91 8745875061</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={20} />
            <span>info@mishtispaces.com</span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl"
        >
          Contact Agent
        </button>

        <button className="w-full mt-3 text-black border border-gray-300 hover:bg-gray-50 py-4 rounded-xl font-semibold">
          Schedule Visit
        </button>
      </div>

      {/* Contact Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Contact Agent
            </h2>

            <p className="text-gray-500 mb-6">
              Fill in your details and our agent will contact you shortly.
            </p>

            <form className="space-y-4 text-black">
              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
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