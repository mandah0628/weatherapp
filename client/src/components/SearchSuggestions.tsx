export default function SearchSuggestions({ citySuggestions, onSelect } : {citySuggestions : any, onSelect : any}) {
  return (
    <ul className="absolute left-0 right-0 bg-white border rounded-lg mt-2 max-h-60 overflow-y-auto">
      {citySuggestions.map((city : any, index : any) => (
        <li
          key={index}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(city)}
        >
          {city.name}, {city.state ? `${city.state}, ` : ""}{city.country}
        </li>
      ))
      }
    </ul>
  );
}
