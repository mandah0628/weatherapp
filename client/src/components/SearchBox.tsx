"use client";

import { useState } from "react";
import FetchCities from "@/utils/FetchCities";
import SearchSuggestions from "@/components/SearchSuggestions";

export default function SearchBox({updateCoords} : {updateCoords : any}) 
{
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cityQueryChange = async(e : any) => {
      const userInput = e.target.value;
      setQuery(e.target.value);

      if(userInput) {
          const cities = await FetchCities(userInput);
          setSuggestions(cities);
      } else {
        setSuggestions([]);
      }
    };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={cityQueryChange}
        placeholder="Search for a city"
        className="p-2 border rounded-xl focus:outline-none w-full"
      />
      {suggestions.length > 0 && (
        <SearchSuggestions
          citySuggestions={suggestions}
          onSelect={(city : any) => 
            {
              updateCoords({lat: city.lat, lon: city.lon})
              setQuery(city.name);
              setSuggestions([]);
            }}
        />
      )}
    </div>
  );
  
}
