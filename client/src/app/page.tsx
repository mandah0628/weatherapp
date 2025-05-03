"use client"

import CurrentForecast from "@/components/WeatherInfo/CurrentForecast";
import WeeklyForecast from "@/components/WeatherInfo/WeeklyForecast";
import HourlyForecast from "@/components/WeatherInfo/HourlyForecast";
import ExtraInfo from "@/components/WeatherInfo/ExtraInfo";
import { useState, useEffect } from "react";
import GetBrowserLocation from "@/utils/GetBrowserLocation";
import FetchWeather from "@/utils/FetchWeather";



export default function WeatherInfo({})
{
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    async function FetchWeatherData() {
      try {
        const browserCoords : any = await GetBrowserLocation()
        const res : any = await FetchWeather(browserCoords.lat, browserCoords?.lon)
        setWeatherData(res.data)
        console.log(res.data)
      } catch (error) {
        
      }
      
    }

    FetchWeatherData()
  }, []);
  
 
  return(
    <>
    </>
  );
}