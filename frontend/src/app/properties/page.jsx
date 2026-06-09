import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilter from "@/components/property/PropertyFilter";
import SearchBar from "@/components/property/SearchBar";


const Page = () => {
  return (
    <div className="bg-white text-black px-10 py-2">
      <div>
        <SearchBar />
      </div>
      <div className="flex felx-row gap-2">
        <div>
          <PropertyFilter />
        </div>
        <div>
          <PropertyCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
