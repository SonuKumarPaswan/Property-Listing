import NoidaOffice from "@/components/property/NoidaOffice";
import PropertyListings from "@/components/property/PropertyCard";
import PropertyFilter from "@/components/property/PropertyFilter";
import SearchBar from "@/components/property/SearchBar";

const Page = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-6">
        <SearchBar />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <PropertyFilter />
          </div>

          {/* Property Listings */}
          <div className="flex-1">
            <PropertyListings />
            {/* <NoidaOffice/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
