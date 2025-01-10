"use client";

import WeatherInfo from "@/components/WeatherInfo";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWeather } from "@/utils/fetchWeather";

export default function Home()
{
    const searchParams = useSearchParams();
    let lat = searchParams.get("lat");
    let lon = searchParams.get("lon");

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getWeather = async () => {
          try {
            const data = await fetchWeather(lat, lon); 
            setWeatherData(data); 
            setLoading(false); 
          } catch (err) {
            setError("Failed to fetch weather data"); 
            setLoading(false); 
          }
        };
      
        if (lat && lon) { 
          getWeather();
        }
      }, [lat, lon]); 

    return(
        <div className="h-screen bg-cover bg-center">
            <WeatherInfo weatherData={weatherData}/>
        </div>
    );
}