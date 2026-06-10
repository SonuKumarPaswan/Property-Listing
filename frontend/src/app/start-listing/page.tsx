// app/properties/create/page.tsx
'use client';

import api from '@/lib/api';
import Image from 'next/image';
import React, { useState , useRef } from 'react';


export default function CreateProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'House',
    address: '',
    city: '',
    price: '',
    rentalPeriod: 'Monthly',
    area: '',
    bedrooms: 3,
    bathrooms: 2,
    amenities: [] as string[],
  });

  const amenityOptions = [
    'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Balcony', 
    '24/7 Security', 'Elevator', 'Fireplace', 'Smart Home'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBedBathChange = (field: 'bedrooms' | 'bathrooms', increment: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(1, Math.min(10, prev[field] + increment))
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property Data:', formData);
    try {
        const res = await api.post('/office/', formData);
        console.log('Server Response:', res.data);
        
    } catch (error) { 
        console.error('Error submitting property listing:', error);
    }
    alert('Property listing submitted successfully! (Demo)');
  };


  const [images, setImages] = useState<File[]>([]);           // Actual files
const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Preview URLs
const fileInputRef = useRef<HTMLInputElement>(null);

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  const validFiles = files.filter(file => file.type.startsWith('image/'));

  if (validFiles.length === 0) return;

  setImages(prev => [...prev, ...validFiles]);

  const newPreviews = validFiles.map(file => URL.createObjectURL(file));
  setImagePreviews(prev => [...prev, ...newPreviews]);
};

const removeImage = (index: number) => {
  URL.revokeObjectURL(imagePreviews[index]); // Free memory
  setImages(prev => prev.filter((_, i) => i !== index));
  setImagePreviews(prev => prev.filter((_, i) => i !== index));
};

const triggerFileUpload = () => {
  fileInputRef.current?.click();
};

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
         
          
          <div>
         
           
          </div>
        </div>

        <div className="flex items-center gap-6">
         
           
            <span className="font-medium text-gray-700"></span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-medium text-sm"></div>
              <div className="text-xs text-green-600"></div>
            
           
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-8 flex gap-8">
        {/* Main Form Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900">Create New Property</h1>
              <p className="text-gray-600 mt-2">Fill in the details to start listing your property on Mishti Spaces</p>
            </div>
            <button 
              onClick={handleSubmit}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-2xl hover:brightness-105 transition flex items-center gap-2 shadow-lg shadow-rose-500/30"
            >
              <span>Publish Listing</span>
              <span className="text-xl">→</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Information */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                📍 Basic Information
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Luxurious Office Space "
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 text-lg text-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-rose-500 bg-white appearance-none text-gray-700"
                  >
                    <option value="Office Space">Office Space</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Villa">Villa</option>
                    <option value="Land Plot">Land Plot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rental Period</label>
                  <div className="flex gap-2">
                    {['Daily', 'Monthly', 'Yearly'].map(period => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, rentalPeriod: period}))}
                        className={`flex-1 py-4 rounded-2xl text-sm font-medium transition-all ${
                          formData.rentalPeriod === period 
                            ? 'bg-blue-600 text-white shadow' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Noida Sector 63"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 text-lg text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City / Area</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Noida, Uttar Pradesh"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 text-lg text-black"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Specs */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                💰 Pricing &amp; Specifications
              </h2>
              
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-4 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="850000"
                      className="w-full pl-12 pr-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 text-lg text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft)</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="2579"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 text-lg text-black"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 text-black">
                    <label className="block text-sm font-medium text-gray-700 mb-2 ">Car Parking</label>
                    <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">
                      <button type="button" onClick={() => handleBedBathChange('bedrooms', -1)} className="text-2xl text-black w-8">-</button>
                      <span className="flex-1 text-center font-semibold text-xl">{formData.bedrooms}</span>
                      <button type="button" onClick={() => handleBedBathChange('bedrooms', 1)} className="text-2xl text-gray-400 hover:text-gray-600 w-8">+</button>
                    </div>
                  </div>
                  <div className="flex-1 text-black">
                    <label className="block text-sm font-medium text-gray-700 mb-2 ">Bathrooms</label>
                    <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3">
                      <button type="button" onClick={() => handleBedBathChange('bathrooms', -1)} className="text-2xl text-gray-400 hover:text-gray-600 w-8">-</button>
                      <span className="flex-1 text-center font-semibold text-xl">{formData.bathrooms}</span>
                      <button type="button" onClick={() => handleBedBathChange('bathrooms', 1)} className="text-2xl text-gray-400 hover:text-gray-600 w-8">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-grey-100">
              <h2 className="text-xl text-black font-semibold mb-6"> Description</h2>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Beautiful spacious property with modern amenities, located in a prime neighborhood..."
                className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:border-rose-500 resize-none text-gray-700"
              />
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl text-black font-semibold mb-6">✨ Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenityOptions.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-5 py-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                      formData.amenities.includes(amenity)
                        ? 'bg-white border-rose-200 text-black shadow bg-gradient-to-r from-rose-100 to-rose-200'
                        : 'border-gray-800 hover:border-gray-700 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Preview Sidebar */}
        <div className="w-96 flex-shrink-0">
          <div className="sticky top-24">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-6">
              <div className="h-64 relative">
                <Image 
                  src="/Office.jpeg"
                  alt="office Space Preview" 
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
                <div className="absolute top-4 left-4 bg-white/90 text-xs text-black font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Available
                </div>
                <div className="absolute bottom-4 right-4 bg-blue-300 px-3 py-1 rounded-xl text-sm font-semibold shadow">
                  ₹{formData.price || '8,50,000'}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                  {formData.title || "High-Yield Commercial Property"}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {formData.city || "Noida Sector 63, Uttar Pardesh, India"}
                </p>

                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-mono text-lg font-semibold">{formData.bedrooms}</span>
                    <span className="text-gray-500 ml-1">Parking</span>
                  </div>
                  <div>
                    <span className="font-mono text-lg font-semibold">{formData.bathrooms}</span>
                    <span className="text-gray-500 ml-1">Security</span>
                  </div>
                  <div>
                    <span className="font-mono text-lg font-semibold">{formData.area}</span>
                    <span className="text-gray-500 ml-1">sqft</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Gallery Preview - Enhanced with Real Upload */}
<div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold">Property Images</h3>
    <span className="text-sm text-gray-500">
      {imagePreviews.length} / 10 photos
    </span>
  </div>

  <div className="grid grid-cols-3 gap-3">
    {/* Existing Uploaded Images */}
    {imagePreviews.map((preview, index) => (
      <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100">
        <Image 
          src={preview} 
          alt={`Property image ${index + 1}`} 
          fill 
          className="object-cover" 
        />
        <button
          onClick={() => removeImage(index)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 transition-all shadow-md"
        >
          ×
        </button>
      </div>
    ))}

    {/* Add More Button */}
    <div
      onClick={triggerFileUpload}
      className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
    >
      <span className="text-5xl text-gray-300 mb-1">+</span>
      <span className="text-sm font-medium text-gray-500">Add More</span>
    </div>
  </div>

  {/* Hidden File Input */}
  <input
    ref={fileInputRef}
    type="file"
    multiple
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
  />

  <p className="text-xs text-gray-500 mt-4 text-center">
    {imagePreviews.length === 0 
      ? "Upload high-quality images (Minimum 3 recommended)" 
      : "Click on images to remove • JPG, PNG, max 10MB each"}
  </p>
</div>

            <div className="mt-8 text-center text-xs text-gray-400">
              Your listing will be reviewed within 24 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}