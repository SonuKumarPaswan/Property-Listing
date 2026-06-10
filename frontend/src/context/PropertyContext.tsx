"use client";

import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: 0,
    maxPrice: 10000,
    propertyType: "",
  });

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const usePropertyFilter = () => {
  return useContext(FilterContext);
};