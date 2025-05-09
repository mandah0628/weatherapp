"use client"

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import GetBrowserLocation from "@/utils/GetBrowserLocation";
import FetchWeather from "@/utils/FetchWeather";
import CurrentForecast from "@/components/WeatherInfo/CurrentForecast";
import HourlyForecast from "@/components/WeatherInfo/HourlyForecast";
import WeeklyForecast from "@/components/WeatherInfo/WeeklyForecast";
import TodayExtra from "@/components/WeatherInfo/TodayExtra";


const GoogleMap = dynamic(
  () => import("@/components/WeatherInfo/GoogleMap"),
  { ssr: false }
);

import FetchCity from "@/utils/FetchCityReverse";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Tomorrow from "@/components/WeatherInfo/Tomorrow";
import ExtraCities from "@/components/WeatherInfo/ExtraCities";
import GetBackground from "@/utils/GetBackground";



export default function WeatherInfo() {
  
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherCoords, setWeatherCoords] = useState<any>(null);
  const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false);
  
  const cardClass = "bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm";

  const toggleSidebar = () => {
    setIsSideBarOpen(prev => !prev)
  }
  // only first mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const browserCoords = await GetBrowserLocation();
        const browserCity = await FetchCity(browserCoords)
        const browserCityCoords = {lat: browserCity.lat, lon: browserCity.lon}
        setWeatherCoords(browserCityCoords);                
      } catch (err) {
        console.error(err);
        
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  // when coords change
  useEffect(() => {
    if (!weatherCoords) {
      return;  
    } 

    (async () => {
      try {
        setLoading(true)
        const weatherData : any = await FetchWeather(weatherCoords.lat, weatherCoords.lon );
        const city = await FetchCity({lat: weatherCoords.lat, lon: weatherCoords.lon})
        setWeatherData({...weatherData.data, city: city.name});

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();                                          
  }, [weatherCoords]);

  if (loading || !weatherData) {
    return null
  }


  return (
    <div className={`min-h-screen pt-16 pb-5 ${GetBackground({
      sunset:weatherData.current.sunset, sunrise: weatherData.current.sunrise, offset: weatherData.timezone_offset, timestamp: weatherData.current.dt})} `}>

      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-16 z-50">
        <Header toggleSidebar={toggleSidebar} updateCoords={setWeatherCoords} />
      </div>
  
      {/* Sidebar */}
      <div className="">
        <SideBar
          cities={[{ name: "ub" }, { name: "sk" }, { name: "is" }]}
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          
        />
      </div>
      
  
      {/* Weather Info */}
      <main className="gap-4 px-5 pt-5 grid grid-cols-12 xl:auto-rows-fr 2xl:auto-rows-fr auto-rows-auto">

        <div className={`col-span-12 md:col-span-6 lg:col-span-6  xl:col-span-4 xl:row-span-4 
                      2xl:col-span-3 2xl:row-span-4 border rounded-2xl overflow-hidden min-w-[250px] ${cardClass}`}>
          <CurrentForecast
            currentData={{
              ...weatherData.current,
              precipitation: weatherData.hourly[0].pop,
            }}
            timezoneOffset={weatherData.timezone_offset}
            cityName={weatherData.city}
          />
        </div>
  

        <div className={`col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4 xl:row-span-4 2xl:col-span-5 2xl:row-span-4 
                    border rounded-2xl overflow-hidden min-h-[350px] ${cardClass}`}>
          <GoogleMap
            coords={{ lat: weatherCoords.lat, lng: weatherCoords.lon }}
            />
        </div>

        <div className={`col-span-12 xl:col-span-4 xl:row-span-4 2xl:col-span-2 2xl:row-span-4 
                    border rounded-2xl min-w-[250px] overflow-hidden ${cardClass}`}>
            <Tomorrow
              tomorrowData={weatherData.daily[1]}
            />
        </div>


        <div className={`col-span-12 sm:col-span-12 md:col-span-6  lg:col-span-6 xl:col-span-6 xl:row-span-6 
                      2xl:col-span-2 2xl:row-span-4 overflow-hidden min-w-[250px] ${cardClass}`}>
          <TodayExtra
            data={weatherData.current}
            timezoneOffset={weatherData.timezone_offset}
          />
        </div>

        <div className={`col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 xl:row-span-6 2xl:col-span-6
                      2xl:row-span-8  overflow-hidden min-w-[250px] ${cardClass}`}>
          <WeeklyForecast
            time={weatherData.current.dt}
            dailyData={weatherData.daily.slice(0,7)}
            timezoneOffset={weatherData.timezone_offset}
          />
        </div>

        

        <div className={`col-span-12 xl:col-span-12 xl:row-span-1 2xl:col-span-6 2xl:row-span-2 
                      border rounded-2xl min-w-[250px] ${cardClass}`}>
          <HourlyForecast
            todayData={{sunrise: weatherData.daily[0].sunrise, sunset: weatherData.daily[0].sunset}}
            tomorrowData={{sunrise: weatherData.daily[1].sunrise, sunset: weatherData.daily[1].sunset}}
            hourlyData={weatherData.hourly}
            timezoneOffset={weatherData.timezone_offset}
          />
        </div>

        <div className={`col-span-12 xl:col-span-12 xl:row-span-2 2xl:col-span-6 2xl:row-span-6 
                      border rounded-2xl min-w-[250px] ${cardClass}`}>
            <ExtraCities
              updateCoords={setWeatherCoords}
            />
        </div>

      </main>
    </div>
  );
  
}