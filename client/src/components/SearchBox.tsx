"use client";

import { useState } from "react";
import FetchSuggestions from "@/utils/FetchSuggestions";
import SearchSuggestions from "@/components/SuggestionList";

export default function SearchBox({updateCoords} : {updateCoords : any}) 
{
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleQueryChange = async(e : React.ChangeEvent<HTMLInputElement>) => {
      const userInput = e.target.value;
      setQuery(e.target.value);

      if(userInput) {
          const suggestions = await FetchSuggestions(userInput);
          setSuggestions(suggestions);
      } else {
        setSuggestions([]);
      }
    };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search for a city"
        className="p-2 border rounded-xl focus:outline-none w-full"
      />
      {suggestions.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelect={(city : any) => {
            updateCoords({lat: city.lat, lon: city.lon})
            setQuery("")
            setSuggestions([]);
          }}
        />
      )}
    </div>
  );
  
}
