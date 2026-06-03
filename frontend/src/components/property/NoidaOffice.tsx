"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface NoidaOfficeData {
  title?: string;
  location?: string;
  price?: string;
  image?: string;
}

const NoidaOffice = () => {
  const [data, setData] = useState<NoidaOfficeData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNoidaOffice = async () => {
    try {
      const res = await fetch("/api/noida-office");

      setData([
        {
          title: "Luxury Office Space",
          location: "Sector 62, Noida",
          price: "₹1,25,00,000",
          image: "https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg",
        },
        {
          title: "Corporate Workspace",
          location: "Sector 18, Noida",
          price: "₹95,00,000",
          image: "https://reanty.themes-studio.com/assets/img/feature/feature-img2.jpg",
        },
        {
          title: "Premium Office",
          location: "Sector 132, Noida",
          price: "₹2,10,00,000",
          image: "https://reanty.themes-studio.com/assets/img/feature/feature-img1.jpg",
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch office data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoidaOffice();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
   <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Noida Office Spaces</h1>
    <p className="text-gray-600 mb-6">
      Explore our premium office spaces in Noida, designed for modern businesses.
    </p>
     <div className="flex flex-row gap-4">
      {data.map((office, index) => (
        <div
          key={index}
          className="flex-1 min-w-0 bg-white rounded-md overflow-hidden shadow-xl hover:shadow-lg transition-all duration-300 bg-cover bg-center"
          style={{
            backgroundImage: office.image
              ? `url(${office.image})`
              : `url('https://reanty.themes-studio.com/assets/img/feature/feature-img3.jpg')`,
          }}
        >
          <div className="h-[300px]" />

          <div className="p-6 w-[70%] border border-gray-200 bg-white rounded-tr-3xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {office.title}
            </h2>

            <div className="flex items-center text-gray-600 mb-4">
              <span className="mr-2">📍</span>
              <span>{office.location}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-2xl font-bold text-gray-900">{office.price}</p>
              </div>

              <button className="w-12 h-12 bg-gray-900 hover:bg-blue-600 transition-all rounded flex items-center justify-center text-white text-2xl">
                →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
   </div>
  );
};

export default NoidaOffice;