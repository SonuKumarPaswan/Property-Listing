"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  resultsCount: number;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  resultsCount,
  placeholder = "Search by property title, city (Noida, Delhi, Gurgaon...), location, or type (apartment, villa, office)...",
}) => {
  return (
    <div className="w-full p-10 sm:p-5">
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1 group">
          <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400
           group-focus-within:text-[#2043B0] transition-colors">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded border border-[#E5E7EB] bg-[#F5F7FF] text-xs sm:text-sm text-[#172554] placeholder-[#4B5563]/60 focus:bg-white focus:outline-none focus:border-[#2043B0] focus:ring-2 focus:ring-[#2043B0]/15 transition-all duration-200"
          />

          {value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-[#172554] transition-colors cursor-pointer p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results Badge */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5F7FF] border border-blue-100 text-[#2043B0] font-semibold text-xs whitespace-nowrap shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2043B0]" />
            <span>
              {resultsCount} {resultsCount === 1 ? "Property" : "Properties"}{" "}
              Found
            </span>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default SearchBar;
