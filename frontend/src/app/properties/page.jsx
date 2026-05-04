"use client"

import PropertyFilter from "@/components/shared/PropertyFilter";
import PropertyCard from "@/components/property/PropertyCard";
import {useEffect, useState} from "react";
import api from "@/lib/api";
const page = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await api.get("/properties");
    console.log(res.data.data);
    setProperties(res.data.data);
  };
  return (
    <div className="container flex justify-between gap-2 mx-auto p-4 ">
        <PropertyFilter />
      
        <PropertyCard  properties={properties} />
    </div>
  );
};

export default page;
