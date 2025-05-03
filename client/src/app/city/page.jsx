"use client";

import WeatherInfo from "@/app/page";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWeather } from "@/utils/fetchWeather";
import { LoadScript } from "@react-google-maps/api";


export default function Home()
{
    const searchParams = useSearchParams();
    let lat = searchParams.get("lat");
    let lon = searchParams.get("lon");
    let cityName = searchParams.get("city");

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getWeather = async () => {
          try {
            setLoading(true);
            const data = await fetchWeather(lat, lon); 
            setWeatherData(data); 
          } catch (err) {
            setError("Failed to fetch weather data"); 
          } finally {
            setLoading(false); 
          }
        };
      
        if (lat && lon) { 
          getWeather();
        }
      }, [lat, lon]); 

    return(
      <div className="h-screen bg-cover bg-center">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        preventGoogleFontsLoading={true}
      >
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && <WeatherInfo weatherData={weatherData} cityName={cityName} />}
      </LoadScript>
    </div>
    );
}