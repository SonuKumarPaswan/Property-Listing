"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import PropertyCard from "@/components/property/PropertyCard";

const Page = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await api.get("/properties");
    setProperties(res.data.data);
  };

  return (
    <div className="container mx-auto p-4">
      <PropertyCard properties={properties} />
    </div>
  );
};

export default Page;