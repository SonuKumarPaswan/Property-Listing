"use client";
import React from "react";

const CustomersSaying = () => { 
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center gap-10 py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-900">
        What Our Customers Say
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 mb-4">
            "I had an amazing experience with this property listing website. The
            user interface is intuitive and the search filters helped me find my
            dream home in no time!"
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Customer 1"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Emily R.</p>
              <p className="text-sm text-gray-500">Home Buyer</p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 mb-4">
            "The customer support team was incredibly helpful and responsive.
            They guided me through the entire process of renting an office
            space, making it a stress-free experience."
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Customer 2"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">Michael S.</p>
              <p className="text-sm text-gray-500">Office Renter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersSaying;