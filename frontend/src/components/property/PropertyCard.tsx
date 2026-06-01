"use client";

import { Property } from "@/data/Property";
import Image from "next/image";

export default function PropertyCard({ properties }: { properties: Property[] }) {

  // const{ images } = properties[0] || {};
  // console.log("Rendering PropertyCard with properties:", properties[0]?.images[0]?.url);

  if (!properties || properties.length === 0) {
    return <p className="text-center w-full">No properties found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {properties.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl transition duration-300"
        >
        
          <div className="relative h-52 w-full">
            {/* <Image
              src={item.images?.[0]?.url || "/placeholder.jpg"}
              alt={item.title}
              fill
              className="object-cover"
            /> */}

            <span className="absolute top-3 left-3 bg-white text-orange-600 text-xs px-3 py-1 rounded-full font-semibold shadow">
              {item.listingType === "sale" ? "FOR SALE" : "FOR RENT"}
            </span>
          </div>

          {/* 📄 Content */}
          <div className="p-4">
            {/* Price */}
            <h2 className="text-xl font-bold">
              ₹{item.price.toLocaleString()}
            </h2>

            {/* Title */}
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-800 font-medium text-sm">
                {item.details?.bedrooms} BHK {item.title}
              </p>

              {item.isVerified && (
                <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">
                  ✔ Verified
                </span>
              )}
            </div>

            {/* Location */}
            <p className="text-gray-500 text-sm mt-1">
              📍 {item.location?.city}, {item.location?.state}
            </p>

            <hr className="my-3" />

            {/* Details */}
            <div className="flex justify-between text-center text-sm text-gray-700">
              <div>
                <p className="font-semibold">{item.details?.bedrooms}</p>
                <p className="text-gray-500 text-xs">Beds</p>
              </div>

              <div>
                <p className="font-semibold">{item.details?.bathrooms}</p>
                <p className="text-gray-500 text-xs">Baths</p>
              </div>

              <div>
                <p className="font-semibold">{item.details?.area}</p>
                <p className="text-gray-500 text-xs">
                  {item.details?.areaUnit}
                </p>
              </div>

              <div>
                <p className="font-semibold">{item.details?.floor}</p>
                <p className="text-gray-500 text-xs">Floor</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}