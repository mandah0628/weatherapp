// Header.tsx
"use client"

import { Menu } from "lucide-react";
import SearchBox from "./SearchBox";

export default function Header({ toggleSidebar, updateCoords }: any) {
  return (
    <header className="flex items-center gap-3 p-2">
      
      <Menu
        className="cursor-pointer flex-shrink-0"
        size={28}
        onClick={toggleSidebar}
      />

      
      <div className="flex-1 min-w-0 max-w-85">
        <SearchBox updateCoords={updateCoords} />
      </div>
    </header>
  );
}
