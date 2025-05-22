"use client";

import { CircleMinus, CirclePlus, Menu, Star } from "lucide-react";
import SearchBox from "./SearchBox";
import { useAuth } from "@/context/AuthContext";
import { Dispatch, SetStateAction, useState } from "react";
import GetWeather, { Coords } from "@/utils/GetWeather";
import { AxiosBackend } from "@/utils/Axios";
import { toast } from "react-toastify";

export interface RequestBody {
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}

export default function Header({ toggleSidebar, setWeatherCoords, setUserCities, setUserWeatherData, userCities, currentCity } : {
  toggleSidebar: () => void; setWeatherCoords: Dispatch<SetStateAction<Coords | null>>; setUserCities: Dispatch<SetStateAction<any[]>>; setUserWeatherData: Dispatch<SetStateAction<any[]>>; userCities: any[]; currentCity: RequestBody }) {

  const { authState } = useAuth();

  const [isDefaultCity, setIsDefaultCity] = useState<boolean>(() => {
    const defaultCoords = localStorage.getItem("defaultCoords")
    if(!defaultCoords) {
      return false
    }

    try {
      const parsedCoords :Coords | null = defaultCoords ? JSON.parse(defaultCoords) : null
      const isDefaultCity :boolean = currentCity.lat === parsedCoords?.lat && currentCity.lon === parsedCoords.lon 
      return isDefaultCity
    } catch (error) {
      return false
  }})


  // makes the current city the default city
  const MakeCityDefault = () => {
    const newDefaultCity :Coords = {lat: currentCity.lat, lon: currentCity.lon}
    localStorage.setItem("defaultCoords",JSON.stringify(newDefaultCity))
    setIsDefaultCity(true)
    toast.success(`${currentCity.name} is set as default city!`)
  }

  // adds the current city to the user's saved cities
  const AddCity = async () => {
    try {
      const res = await AxiosBackend.post(`/city/add-city`, currentCity);
      if (res.status === 200) {
        setUserCities(prev => [...prev, currentCity])
        const newCityWeather = await GetWeather({lat :currentCity.lat, lon: currentCity.lon})
        setUserWeatherData(prev => [...prev,  newCityWeather])
        toast.success(`${currentCity.name} added to saved cities.`);
      }
      
    } catch (error) {
      console.error(error);
      toast.error("Failed to add city.");
    }
  };


  // removes the current city from the user's saved cities
  const RemoveCity = async () => {
    if (!userCities) {
      return;
    }

    // finds the city object where names match
    const cityToRemove = userCities.find((city: any) => city.name === currentCity.name)
    if (!cityToRemove) {
      return
    }

    // get the city id
    const cityId :string = cityToRemove.id;

    try {
      const res = await AxiosBackend.delete(`/city/remove-city/${cityId}`);
      if (res.status === 200) {
        setUserCities(prev => prev.filter((userCity) => userCity.name !== currentCity.name))
        toast.success(`${currentCity.name} removed from saved cities!`);
        setUserWeatherData(prev => prev.filter((cityWeather) => cityWeather.lat !== currentCity.lat))
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to remove city.");
    }
  };

  const isCitySaved = userCities?.some((city: any) => city.name === currentCity.name);

  return (
    <header className="flex items-center gap-3 p-2">
      <Menu className="cursor-pointer flex-shrink-0" size={28} onClick={toggleSidebar} />

      <div className="flex-1 min-w-0 max-w-85">
        <SearchBox updateCoords={setWeatherCoords}/>
      </div>

      <div className="relative">
        {authState &&
          (isCitySaved ? (
            <div className="relative">
              <CircleMinus
                onClick={RemoveCity}
                className="cursor-pointer relative z-10 text-red-500"
              />
            </div>
          ) : (
            <div className="relative">
              <CirclePlus
                onClick={AddCity}
                className="cursor-pointer relative z-10 text-green-500"
              />
            </div>
          ))}
      </div>

      <div>
          {isDefaultCity ? (
            <div title="This is your default city" className="cursor-pointer">
              <Star fill="yellow" stroke="yellow"/>
            </div>
            
            ) : (
              <div title="Click to make this city your default" className="cursor-pointer">
                <Star onClick={() => MakeCityDefault()}/>
              </div>
            )
          }
      </div>
    </header>
  );
}
