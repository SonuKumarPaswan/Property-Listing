import { createContext, useState } from "react";

const FilterContext = createContext();

export const PropertyProvider = ({children })=>{
    const[filters,setFilters]=useState({
        location:"",
        minPrice:0,
        maxPrice:10000,
        properType:"",
    })
    return(
        <PropertyProvider.Provider>
            
        </PropertyProvider.Provider>
    )
}