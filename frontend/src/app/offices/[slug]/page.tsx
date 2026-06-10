
'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Mock property data (in real app, fetch from API or database)
const propertyData = {
  'modern-villa': {
    id: 'modern-villa',
    title: 'Modern Office Space',
    location: 'Noida, Uttar Pardesh',
    price: '₹4,62,120',
    image: '/images/modern-villa-main.jpg',
    images: [
      '/Office.jpeg',
      '/Office.jpeg',
      '/Office.jpeg',
      '/Office.jpeg',
    ],
    description: `Experience luxury living in this stunning modern villa located in the heart of Miami. This architectural masterpiece features floor-to-ceiling windows, open-concept living spaces, and breathtaking ocean views. Perfect for those seeking sophistication and comfort.`,
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      area: '8,450 sq ft',
      yearBuilt: 2023,
      type: 'Villa',
    },
    amenities: [
      'Private Pool',
      'Home Theater',
      'Smart Home System',
      'Gym & Spa',
      'Wine Cellar',
      'Rooftop Terrace',
      '3-Car Garage',
      '24/7 Security',
    ],
    features: [
      'Floor-to-ceiling glass walls',
      'Chef’s kitchen with premium appliances',
      'Master suite with private balcony',
      'Eco-friendly solar panels',
      'Landscaped garden with fountain',
    ],
  },
  // Add more properties here as needed
};

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  images: string[];
  description: string;
  specs: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    yearBuilt: number;
    type: string;
  };
  amenities: string[];
  features: string[];
}


export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const property =
    propertyData[slug as keyof typeof propertyData] as Property | undefined;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <Link href="/" className="text-blue-600 hover:underline text-lg">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Image Gallery */}
      <div className="relative h-[70vh] bg-black overflow-hidden">
        <Image
          src={property.images[currentImageIndex]}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

        {/* Image Navigation */}
        <button 
          onClick={prevImage}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full transition-all text-gray-900 shadow-lg"
        >
          ←
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full transition-all text-gray-900 shadow-lg"
        >
          →
        </button>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {property.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'}`}
            />
          ))}
        </div>

        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm mb-4">
                  {property.specs.type}
                </div>
                <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-xl opacity-90">
                  📍 {property.location}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm opacity-75">Starting From</div>
                <div className="text-5xl font-semibold tracking-tighter">{property.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Description */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">About this property</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {property.description}
            </p>
          </div>

          {/* Key Specifications */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">Key Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Bedrooms', value: property.specs.bedrooms },
                { label: 'Bathrooms', value: property.specs.bathrooms },
                { label: 'Built-up Area', value: property.specs.area },
                { label: 'Year Built', value: property.specs.yearBuilt },
              ].map((spec, i) => (
                <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl">
                  <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
                  <div className="text-3xl font-semibold text-gray-900">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-3xl text-black font-semibold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100">
                  <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                  <div className="text-gray-700">{feature}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-3xl text-black font-semibold mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-3 bg-white text-black p-5 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                  <span className="text-2xl">✦</span>
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white sticky top-24 rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-blue-700 mb-1">{property.price}</div>
              <div className="text-gray-500">One-time payment</div>
            </div>

            <button 
              onClick={() => setShowContact(true)}
              className="w-full bg-blue-700 hover:bg-blue-800 transition-colors text-white py-4 rounded-2xl text-lg font-semibold mb-4 flex items-center justify-center gap-2"
            >
              Schedule a Viewing
            </button>

            <button className="w-full border border-gray-300 hover:bg-gray-50 transition-colors py-4 rounded-2xl text-lg text-black font-medium">
              Download Brochure
            </button>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <div className="text-sm text-gray-500 mb-2">Interested in this property?</div>
              <div className="text-2xl font-semibold">+91 98765 43210</div>
              <div className="text-sm text-gray-500 mt-1">Call our luxury consultant</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-10 relative">
            <button 
              onClick={() => setShowContact(false)}
              className="absolute top-6 right-6 text-3xl text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            
            <h3 className="text-3xl font-semibold mb-8">Get in touch</h3>
            
            <form className="space-y-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full px-6 py-4 border text-black border-gray-200 rounded-2xl focus:outline-none focus:border-blue-600"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-6 py-4 border text-black border-gray-200 rounded-2xl focus:outline-none focus:border-blue-600"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full px-6 py-4 border text-black border-gray-200 rounded-2xl focus:outline-none focus:border-blue-600"
              />
              <textarea 
                placeholder="Message (optional)" 
                rows={4}
                className="w-full px-6 py-4 border text-black border-gray-200 rounded-2xl focus:outline-none focus:border-blue-600 resize-y"
              />
              <button 
                type="button"
                onClick={() => {
                  alert("Inquiry submitted! Our team will contact you shortly.");
                  setShowContact(false);
                }}
                className="w-full bg-blue-700 hover:bg-blue-800 py-4 rounded-2xl text-white font-semibold text-lg transition-colors"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white rounded-2xl flex items-center justify-center text-blue-700 font-bold">MS</div>
              <div className="font-bold text-2xl">Mishti Spaces</div>
            </div>
            <p className="text-gray-400 text-sm">Curating the world&apos;s most exclusive homes.</p>
          </div>
          
          <div>
            <div className="font-medium mb-4">Quick Links</div>
            <div className="space-y-2 text-sm text-gray-400">
              <div>Properties</div>
              <div>Services</div>
              <div>Blog</div>
              <div>About Us</div>
            </div>
          </div>
          
          <div>
            <div className="font-medium mb-4">Contact</div>
            <div className="space-y-2 text-sm text-gray-400">
              <div>info@mishtispaces.com</div>
              <div>+91 98765 43210</div>
              <div>Miami • Noida • London</div>
            </div>
          </div>
          
          <div>
            <div className="font-medium mb-4">Follow Us</div>
            <div className="flex gap-4 text-2xl">
              <div>𝕏</div>
              <div>📸</div>
              <div>𝕃</div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-16 border-t border-gray-800 pt-8">
          © 2026 Mishti Spaces • All Rights Reserved
        </div>
      </footer>
    </div>
  );
}