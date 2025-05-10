"use client"

export default function SearchSuggestions({ citySuggestions, onSelect } : {citySuggestions : any, onSelect : any}) {
  return (
    <ul className="absolute w-full border rounded-lg mt-2 max-h-48 overflow-y-auto text-black bg-white/75">
      {citySuggestions.map((city : any, index : any) => (
        <li
          key={index}
          className="p-2 cursor-pointer hover:bg-white"
          onClick={() => onSelect(city)}
        >
          {city.name}, {city.state ? `${city.state}, ` : ""}{city.country}
        </li>
      ))
      }
    </ul>
  );
}
