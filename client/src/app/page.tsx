"use client";

import { useState, useEffect } from "react";
import CurrentForecast from "@/components/WeatherInfo/CurrentForecast";
import SearchBox from "@/components/SearchBox";
import GetBrowserLocation from "@/utils/GetBrowserLocation";
import FetchWeather from "@/utils/FetchWeather";

export default function WeatherInfo() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [weatherCoords, setWeatherCoords] = useState<any>(null);


  useEffect(() => {
    (async () => {
      try {
        const coords  = await GetBrowserLocation(); 
        setWeatherCoords(coords);                  
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
  }, []);



  useEffect(() => {
    if (!weatherCoords) {
      return;  
    }                  

    (async () => {
      try {
        setLoading(true);
        const res : any = await FetchWeather(weatherCoords.lat, weatherCoords.lon );
        setWeatherData(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();                                          
  }, [weatherCoords?.lat, weatherCoords?.lon]);

  if (loading || !weatherData) return null;


  return (
    <div>
      <SearchBox 
        updateCoords={setWeatherCoords}
      />

      <CurrentForecast
          currentWeather={{
            ...weatherData.current, precipitation: weatherData.hourly[0].pop
          }}
      />
    </div>
  );
}