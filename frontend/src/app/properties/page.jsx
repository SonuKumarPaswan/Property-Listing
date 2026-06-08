
import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilter from "@/components/property/PropertyFilter";

const Page = () => {

  return (
    <div className="container mx-auto p-4">
      <PropertyFilter />
      <PropertyCard />
    </div>
  );
};

export default Page;