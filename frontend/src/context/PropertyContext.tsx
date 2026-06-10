"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type FilterState = {
  location: string;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
};

type FilterContextType = {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

const FilterContext = createContext<FilterContextType | null>(null);

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider = ({
  children,
}: PropertyProviderProps) => {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    minPrice: 0,
    maxPrice: 10000,
    propertyType: "",
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const usePropertyFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error(
      "usePropertyFilter must be used within PropertyProvider"
    );
  }

  return context;
};