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
import FetchCityReverse from "@/utils/GetCityReverse";
import GetBrowserLocation from "@/utils/GetBrowserLocation";
import FetchWeather, {Coords} from "@/utils/GetWeather";
import FetchMultipleWeather from "@/utils/GetMultipleWeather";
import { useAuth } from "@/context/AuthContext";
import GetMultipleWeather from "@/utils/GetMultipleWeather";

const saskatoonCoords : Coords = {lat: 52.1318, lon: -106.6608}


export default function WeatherInfo() {
  
  const [weatherData, setWeatherData] = useState<any>(null);
  const [userWeatherData, setUserWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherCoords, setWeatherCoords] = useState<Coords | null>(null);
  const [isSidebarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [userCities, setUserCities] = useState<any[]>([])

  const {authState} = useAuth()
  
  const prevCoordsRef = useRef<Coords | null>(null)
  
  const toggleSidebar = () => {
    setIsSideBarOpen(prev => !prev)
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



  // runs when the coords change and 
  // gets weather data for the current coords 
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



  /**
   * Gets the user's cities and its weather data
   * Updates state for userCities and userWeatherData
   */
  const GetUserCitiesAndWeather = async () => {
    try {
      setLoading(true)

      // gets user cities and updates state
      const res = await AxiosBackend.get("/city/get-cities")
      const userCitiesArr = res.data.cities
      setUserCities(userCitiesArr)

      // fetches weather data for user'c cities
      const userCityWeatherArr = await GetMultipleWeather(userCitiesArr)
      setUserWeatherData(userCityWeatherArr)
  
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  // run only when user auth status changes
  // and fetches the user's saved cities
  useEffect(() => {
    if (!authState) {
      return
    }

    (async () => {
      await GetUserCitiesAndWeather()
    })();
  
  }, [authState])
  

  if (loading || !weatherData) {
    return (
      <div 
        className="w-full min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, 
            #ffffff 0%, 
            #ffff99 10%, 
            #87cefa 60%, 
            #00aaff 100%)`,  
          }}
      >
        <div className="min-w-16 w-64 h-64 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const backgroundClass = GetBackground({
      sunset:weatherData.current.sunset, sunrise: weatherData.current.sunrise, offset: weatherData.timezone_offset, timestamp: weatherData.current.dt})
  const gridClass = `col-span-12 border rounded-2xl overflow-hidden min-w-[250px]`
  const cardClass = "bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-sm";
  const isDay= (weatherData.current.dt > weatherData.current.sunrise && weatherData.current.dt < weatherData.current.sunset)



  return (
    <div className={`min-h-screen pt-16 pb-5 ${backgroundClass}`}>

      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-16 z-50">
        <Header 
          toggleSidebar={toggleSidebar} 
          setWeatherCoords={setWeatherCoords} 
          userCities={userCities} 
          setUserCities={setUserCities}
          setUserWeatherData={setUserWeatherData}
          currentCity={{name: weatherData.name, state: weatherData.state, country: weatherData.country, lat: weatherData.lat, lon: weatherData.lon }}
        />
      </div>
  
      {/* Sidebar */}
      <div>
        <SideBar
          userCities={userCities}
          isSideBarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          background={backgroundClass}
          setWeatherCoords={setWeatherCoords}
          userWeatherData={userWeatherData}
        />
      </div>
      
  
      {/* Weather Info */}
      <main className="gap-4 px-5 pt-5 grid grid-cols-12 xl:grid-rows-6 2xl:auto-rows-fr auto-rows-auto">


        <div className={`md:col-span-6 lg:col-span-6  xl:col-span-4 xl:row-span-4 
                      2xl:col-span-3 2xl:row-span-4 ${gridClass} ${cardClass}`}>
          <CurrentForecast
            currentData={{ ...weatherData.current, precipitation: weatherData.hourly[0].pop }}
            timezoneOffset={weatherData.timezone_offset}
            cityName={weatherData.name}
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