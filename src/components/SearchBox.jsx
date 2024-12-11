"use client";

import { useState } from "react";
import { fetchCities } from "@/utils/fetchCities";
import Dropdown from "@/components/Dropdown";

export default function SearchBox({ onCitySelect }) 
{
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async(e) => 
    {
      const userInput = e.target.value;
      setQuery(userInput);

      if (userInput) 
        {
          const cities = await fetchCities(userInput);
          setSuggestions(cities);
        } 
        
        else 
        {
        setSuggestions([]);
        }
    };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a city"
        className="border p-2 rounded-lg w-full"
      />
      {suggestions.length > 0 && (
        <Dropdown
          items={suggestions}
          onSelect={(city) => 
            {
              onCitySelect(city);
              setQuery(city.name);
              setSuggestions([]);
            }}
        />
      )}
    </div>
  );
}
