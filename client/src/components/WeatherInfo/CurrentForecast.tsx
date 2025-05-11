"use client"

import { MapPin } from "lucide-react";
import Lottie from "@/utils/LottieClient";
import DisplayTime from "@/utils/DisplayTime";
import CalculateCurrentWeek from "@/utils/CalculateCurrentWeek";
import GetWeatherAnimation from "@/utils/GetWeatherAnimation";
import Capitalize from "@/utils/Capitalize";
import WeatherAnimations from "@/utils/WeatherAnimations";

export default function CurrentForecast({ currentData, cityName, timezoneOffset} 
  : {currentData :any, cityName : string, timezoneOffset : number} ) {

    return (
      <div className="w-full h-full flex flex-row items-center justify-center p-5">

        {/* left div */}
        <div className="min-w-0 flex-1"> 

          {/* location */}
          <div className="flex flex-row justify-center items-center border rounded-xl p-2 mb-4 w-fit">
            <MapPin size={30}/>
            <h1 className="font-bold text-xl">{cityName}</h1>
          </div>

          <div className="">
            <p className="font-bold text-3xl">{CalculateCurrentWeek(currentData.dt + timezoneOffset)[0]}</p>
            <p className="font-medium">Local time: {DisplayTime(currentData.dt + timezoneOffset)}</p>
            <p className="pt-5 font-bold text-4xl">{Math.round(currentData.temp)}°C</p>
            <p className="font-medium">Feels like:{" "} {Math.round(currentData.feels_like)}°C</p>  
          </div> 
        </div>


        {/* right div */}
        <div className="flex-col flex-1 justify-center items-center">
          <div className="max-w-64">
            <Lottie animationData={WeatherAnimations[GetWeatherAnimation(currentData.weather[0].id, (currentData.dt > currentData.sunrise)&&(currentData.dt < currentData.sunset), currentData.wind_speed)]}
              style={{width:"100%", height:"100%"}}
            />
          </div>
          
          <p className="text-center text-3xl font-bold">
              {Capitalize(currentData.weather[0].description)}
          </p>
        </div>

      </div>
    );
}
