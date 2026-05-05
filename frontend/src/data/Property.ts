export interface Property {
  _id: string;
  title: string;
  price: number;
  listingType: string;
  isVerified: boolean;

  location: {
    city: string;
    state: string;
  };

  details: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    areaUnit: string;
    floor: number;
  };

  images: {
    url: string;
  }[];
}