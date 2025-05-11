"use client"

import FetchMuiltipleWeather from "@/utils/FetchMultipleWeather";
import GetWeatherAnimation from "@/utils/GetWeatherAnimation";
import Lottie from "@/utils/LottieClient";
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { MapPin } from "lucide-react";
import WeatherAnimations from "@/utils/WeatherAnimations";
import { Coords } from "@/utils/FetchWeather";

export default function ExtraCities({setWeatherCoords} : {setWeatherCoords : Dispatch<SetStateAction<Coords | null>>}) {
    const [loading, setLoading] = useState<boolean>(true);
    const [cityWeatherArr, setCityWeatherArr] = useState<any[] | null>(null)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const arr = await FetchMuiltipleWeather()
                setCityWeatherArr(arr)
    
            } catch (error) {
                console.error()
            } finally {
                setLoading(false)
            }
        })();
    }, [])


    return (
        <div className="w-full h-full p-4">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
            {cityWeatherArr?.map((cityData: any, index: number) => (
              <div
                key={index}
                className="p-3 rounded-xl flex flex-col justify-between cursor-pointer"
                onClick={() =>
                  setWeatherCoords({ lat: cityData.data.lat, lon: cityData.data.lon })
                }
              >
                <div>
                  <div className="flex items-center">
                    <MapPin size={20} />
                    <p className="font-bold text-xl ml-2">{cityWeatherArr[index].city}</p>
                  </div>
      
                  <div className="text-sm mt-2">
                    <p>Temp: {Math.round(cityData.data.current.temp)}°</p>
                    <p>Feels like: {Math.round(cityData.data.current.feels_like)}°</p>
                    <p>High: {Math.round(cityData.data.daily[0].temp.max)}°</p>
                    <p>Low: {Math.round(cityData.data.daily[0].temp.min)}°</p>
                  </div>
                </div>
      
                <div className="max-w-60">
                  <Lottie
                    animationData={WeatherAnimations[GetWeatherAnimation(cityData.data.current.weather[0].id, true, cityData.data.current.wind_speed)]}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}