"use client"

import dynamic from "next/dynamic";

import { useState, useEffect, useRef } from "react";

import CurrentForecast from "@/components/WeatherInfo/CurrentForecast";
import HourlyForecast from "@/components/WeatherInfo/HourlyForecast";
import WeeklyForecast from "@/components/WeatherInfo/WeeklyForecast";
import TodayExtra from "@/components/WeatherInfo/TodayExtra";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Tomorrow from "@/components/WeatherInfo/Tomorrow";
import ExtraCities from "@/components/WeatherInfo/ExtraCities";
const GoogleMap = dynamic(
  () => import("@/components/WeatherInfo/GoogleMap"),
  { ssr: false }
);

import GetBackground from "@/utils/GetBackground";
import { AxiosBackend } from "@/utils/Axios";
import FetchCityReverse from "@/utils/FetchCityReverse";
import GetBrowserLocation from "@/utils/GetBrowserLocation";
import FetchWeather, {Coords} from "@/utils/FetchWeather";

import { useAuth } from "@/context/AuthContext";

const saskatoonCoords : Coords = {lat: 52.1318, lon: -106.6608}


export default function WeatherInfo() {
  
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherCoords, setWeatherCoords] = useState<Coords | null>(null);
  const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [userCities, setUserCities] = useState<any[] | null>(null)
  const {authState} = useAuth()
  
  const prevCoordsRef = useRef<Coords | null>(null)
  
  const toggleSidebar = () => {
    setIsSideBarOpen(prev => !prev)
  }


  const GetUserCities = async () => {
    try {
      const res = await AxiosBackend.get("/city/get-cities")
      setUserCities(res.data.userCities)
    } catch (error) {
      console.log(error)
    }
  }


  // on first mount
  useEffect(() => {
  (async () => {
    try {
      setLoading(true);

      const defaultCoordsRaw = localStorage.getItem("defaultCoords")

      // 1) check if user has default coords, if so, use that to fetch weather
      if (defaultCoordsRaw) {
        const defaultCoords : Coords = JSON.parse(defaultCoordsRaw)
        setWeatherCoords(defaultCoords)
        return
      } 
      
      // 2) if user doeesn't have default coords, fetch Saskatoon weather in the meantime
      setWeatherCoords(saskatoonCoords)

      // 3) try to get browser location
      const browserCoords = await GetBrowserLocation()

      // 4) if browser coords were fetched, use that as default coords and fetch weather
      if (browserCoords) {
          localStorage.setItem("defaultCoords", JSON.stringify(browserCoords))
          setWeatherCoords(browserCoords)
      // if denied or failed, use saskatoon as default    
      } else {
        localStorage.setItem("defaultCoords", JSON.stringify(saskatoonCoords))
      }

    } catch (err) {
      console.error("Failed to set weather coordinates, using Saskatoon coords", err);
      setWeatherCoords(saskatoonCoords)
    } finally {
      setLoading(false);
    }
  })();
  }, []);



  // fetch weather data due to coord change
  // use previous coords if error occurs
  useEffect(() => {
    if (!weatherCoords) {
      return;  
    } 

    (async () => {
      
      try {
        setLoading(true)
        
        const rawWeatherData :any= await FetchWeather(weatherCoords)
        const cityGeoData = await FetchCityReverse(weatherCoords)
        const { minutely, ...weatherData } = rawWeatherData

        setWeatherData({ ...weatherData, name: cityGeoData?.name, state: cityGeoData?.state, country: cityGeoData?.country});
        prevCoordsRef.current = weatherCoords

      } catch (err) {
        console.error("Error fetching weather data, using previous coords to fetch data",err);
        if (prevCoordsRef.current && (
          prevCoordsRef.current.lat !== weatherCoords.lat || prevCoordsRef.current.lon || weatherCoords.lon)) {
            setWeatherCoords(prevCoordsRef.current)
        }
      } finally {
        setLoading(false);
      }
    })();                                          
  }, [weatherCoords]);


  useEffect(() => {
    if (!authState) {
      return
    }

    (async () => {
      try {
        await GetUserCities()
      } catch (error) {
        console.error("Error fetching user's saved cities", error)
      }
    })();
  
  }, [authState])
  


  if (loading || !weatherData) {
    return(
      <div 
        className="w-full min-h-screen"
        style={{
          backgroundImage: `linear-gradient(to top, 
            #fde68a 0%,      
            #38bdf8 33%,    
            #fda4af 66%,     
            #1e3a8a 100%)`,  
        }}
      >
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const backgroundClass = GetBackground({
      sunset:weatherData.current.sunset, sunrise: weatherData.current.sunrise, offset: weatherData.timezone_offset, timestamp: weatherData.current.dt})
  const gridClass = `col-span-12 border rounded-2xl overflow-hidden min-w-[250px]`
  const cardClass = "bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm";
  const isDay= (weatherData.cuurent.dt > weatherData.current.sunrise && weatherData.cuurent.dt < weatherData.cuurent.sunset)

  return (
    <div className={`min-h-screen pt-16 pb-5 ${backgroundClass}`}>

      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-16 z-50">
        <Header 
          toggleSidebar={toggleSidebar} 
          setWeatherCoords={setWeatherCoords} 
          userCities={userCities} 
          setUserCities={setUserCities}
          weatherData={weatherData}
        />
      </div>
  
      {/* Sidebar */}
      <div className="">
        <SideBar
          userCities={userCities}
          isSideBarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
      
  
      {/* Weather Info */}
      <main className="gap-4 px-5 pt-5 grid grid-cols-12 xl:auto-rows-fr 2xl:auto-rows-fr auto-rows-auto">


        <div className={`md:col-span-6 lg:col-span-6  xl:col-span-4 xl:row-span-4 
                      2xl:col-span-3 2xl:row-span-4 ${gridClass} ${cardClass}`}>
          <CurrentForecast
            currentData={{ ...weatherData.current, precipitation: weatherData.hourly[0].pop }}
            timezoneOffset={weatherData.timezone_offset}
            cityName={weatherData.city}
          />
        </div>
  

        <div className={`md:col-span-6 lg:col-span-6 xl:col-span-4 xl:row-span-4 2xl:col-span-5 2xl:row-span-4 
                     ${cardClass}`}>
          <GoogleMap
            coords={{ lat: weatherCoords?.lat, lng: weatherCoords?.lon }}
            />
        </div>


        <div className={`xl:col-span-4 xl:row-span-4 2xl:col-span-2 2xl:row-span-4 
                    ${gridClass} ${cardClass}`}>
            <Tomorrow
              tomorrowData={weatherData.daily[1]}
            />
        </div>


        <div className={`sm:col-span-12 md:col-span-6  lg:col-span-6 xl:col-span-6 xl:row-span-6 
                      2xl:col-span-2 2xl:row-span-4 ${gridClass} ${cardClass}`}>
          <TodayExtra
            data={weatherData.current}
            timezoneOffset={weatherData.timezone_offset}
          />
        </div>


        <div className={`sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 xl:row-span-6 2xl:col-span-6
                      2xl:row-span-8 ${gridClass} ${cardClass}`}>
          <WeeklyForecast
            time={weatherData.current.dt}
            dailyData={weatherData.daily.slice(0,7)}
            timezoneOffset={weatherData.timezone_offset}
          />
        </div>

        
        <div className={`xl:col-span-12 xl:row-span-1 2xl:col-span-6 2xl:row-span-2 
                      ${gridClass} ${cardClass}`}>
          <HourlyForecast
            todayData={{sunrise: weatherData.daily[0].sunrise, sunset: weatherData.daily[0].sunset}}
            tomorrowData={{sunrise: weatherData.daily[1].sunrise, sunset: weatherData.daily[1].sunset}}
            hourlyData={weatherData.hourly}
            timezoneOffset={weatherData.timezone_offset}
          />
        </div>


        <div className={`xl:col-span-12 xl:row-span-2 2xl:col-span-6 2xl:row-span-6 
                      ${gridClass} ${cardClass}`}>
            <ExtraCities
              setWeatherCoords={setWeatherCoords}
            />
        </div>


      </main>
    </div>
  );
  
}