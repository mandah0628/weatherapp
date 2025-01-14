"use client";

import { useState } from "react";
import { fetchCities } from "@/utils/fetchCities";
import { useRouter } from "next/navigation";

import Dropdown from "@/components/Dropdown";

export default function SearchBox() 
{
  const router  = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cityQueryChange = async(e) => {
      const userInput = e.target.value;
      setQuery(userInput);

      if(userInput) {
          const cities = await fetchCities(userInput);
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
        className="border p-2 rounded-lg w-full"
      />
      {suggestions.length > 0 && (
        <Dropdown
          items={suggestions}
          onSelect={(city) => 
            {
              router.push(`/city?lat=${city.lat}&lon=${city.lon}&city=${encodeURIComponent(city.name)}`)
              setQuery(city.name);
              setSuggestions([]);
            }}
        />
      )}
    </div>
  );
  
}
