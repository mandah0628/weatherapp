// Header.tsx
"use client"

import { CircleMinus, CirclePlus, Menu } from "lucide-react";
import SearchBox from "./SearchBox";
import { useAuth } from "@/context/AuthContext";
import { Dispatch, SetStateAction } from "react";
import { Coords } from "@/utils/FetchWeather";
import { AxiosBackend } from "@/utils/Axios";

interface RequestBody {
  name: string; 
  state: string; 
  country:string; 
  lat: number; 
  lon: number;
}

export default function Header({ toggleSidebar, setWeatherCoords, setUserCities, userCities, weatherData} : 
  {toggleSidebar: () => void; setWeatherCoords: Dispatch<SetStateAction<Coords | null>>; setUserCities: Dispatch<SetStateAction<any[] | null>>; userCities :any[] |null; weatherData :any}) {
    const {authState} = useAuth()


    const RemoveCity = async () => {
      if (!userCities) {
        return
      }

      const cityToRemove :any = userCities?.find((city :any) => city.name === weatherData.name)
      if (!cityToRemove) {
        return
      }

      const cityId :string = cityToRemove.id

      try {
        const res = await AxiosBackend.delete(`/remove-city/${cityId}`)
        if(res.status === 200){
          setUserCities(userCities.filter((city :any) => city.name !== weatherData.name))
        }
      } catch (error) {
        console.error(error)
      }
    }

    const AddCity = async () => {
      try {
        const {name, state, country, lat, lon} = weatherData
        const cityData : RequestBody = {name, state, country, lat, lon}
        const res = await AxiosBackend.post(`/city/add-city`, cityData)

        if(res.status === 200) {
          setUserCities((prev) => (prev ? [...prev, res.data] : res.data))
        }
      } catch (error) {
        console.error(error)
      }
    }

    const isCitySaved = userCities?.some((city :any) => city.name === weatherData.name)

    return (
      <header className="flex items-center gap-3 p-2">
        
        <Menu
          className="cursor-pointer flex-shrink-0"
          size={28}
          onClick={toggleSidebar}
        />

        
        <div className="flex-1 min-w-0 max-w-85">
          <SearchBox updateCoords={setWeatherCoords} />
        </div>

        <div>
          {authState && (isCitySaved ? (
            <div>
              <CircleMinus onClick={() => RemoveCity()} className="cursor-pointer"/>
            </div>
          ) : (
            <div>
              <CirclePlus onClick={() => AddCity()} className="cursor-pointer"/>
            </div>
          ))}
        </div>
      </header>
    );
}
