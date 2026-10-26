import NoidaOffice from "@/components/property/NoidaOffice";
import PropertyListings from "@/components/property/PropertyCard";
import PropertyFilter from "@/components/property/PropertyFilter";
import SearchBar from "@/components/property/SearchBar";

const Page = () => {
  return (
    <div className="bg-[#f3f6fb] text-black min-h-screen p-4 md:p-6">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-4 md:py-6 bg-white rounded shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-slate-200 overflow-hidden">
        <SearchBar />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <PropertyFilter />
          </div>

          {/* Property Listings */}
          <div className="flex-1 rounded">
            <PropertyListings />
            {/* <NoidaOffice/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
