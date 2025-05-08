import { Menu } from "lucide-react";
import SearchBox from "./SearchBox";

export default function Header({toggleSidebar, updateCoords} : any) {
    return(
        <div
        className="relative flex items-center justify-center h-full"
        >
            <Menu
                className="absolute left-4 cursor-pointer"
                onClick={toggleSidebar}
                size={35}
            />

            <div
                className="w-85"
            >
                <SearchBox updateCoords={updateCoords}/>
            </div>
        </div>
    )
}