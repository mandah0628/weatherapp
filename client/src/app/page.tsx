"use client";

import { useState, useEffect } from "react";
import GetBrowserLocation from "@/utils/GetBrowserLocation";
import FetchWeather from "@/utils/FetchWeather";
import SearchBox from "@/components/SearchBox";
import CurrentForecast from "@/components/WeatherInfo/CurrentForecast";
import HourlyForecast from "@/components/WeatherInfo/HourlyForecast";
import WeeklyForecast from "@/components/WeatherInfo/WeeklyForecast";
import ExtraInfo from "@/components/WeatherInfo/ExtraInfo";
import GoogleMap from "@/components/WeatherInfo/GoogleMap";
import FetchCity from "@/utils/FetchCity";

export default function WeatherInfo() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherCoords, setWeatherCoords] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const browserCoords = await GetBrowserLocation();
        const city = await FetchCity(browserCoords)
        const cityCoords = {lat: city.lat, lon: city.lon}
        console.log("Browser Coords:", browserCoords)
        console.log("City info:", cityCoords, city.name)
        setWeatherCoords(cityCoords);                  
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

      <GoogleMap
        coords={{lat:weatherCoords.lat, lng:weatherCoords.lon}}
      />

      <HourlyForecast
        data={weatherData.hourly}
      />

      <WeeklyForecast
        data={weatherData.daily}
      />

      <ExtraInfo
        data={weatherData.current}
      />


    </div>
  );
}