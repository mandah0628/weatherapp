"use client";

export default function Dropdown({ items, onSelect }) {
  return (
    <ul className="absolute left-0 right-0 bg-white border rounded-lg mt-2 max-h-60 overflow-y-auto">
      {items.map((item, index) => (
        <li
          key={index}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(item)}
        >
          {item.name}, {item.state ? `${item.state}, ` : ""}{item.country}
        </li>
      ))
      }
    </ul>
  );
}
