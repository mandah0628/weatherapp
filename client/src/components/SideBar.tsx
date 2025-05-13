"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignInForm from "@/components/SignInForm";
import RegisterForm from "@/components/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import Lottie from "@/utils/LottieClient"
import { MapPin } from "lucide-react";
import GetWeatherAnimation from "@/utils/GetWeatherAnimation";
import WeatherAnimations from "@/utils/WeatherAnimations";
import { Coords } from "@/utils/GetWeather";
import { SquareChevronLeft } from "lucide-react";


export default function SideBar({ isSideBarOpen, userCities, background, toggleSidebar, setWeatherCoords, userWeatherData } :
   {isSideBarOpen :boolean; background : string; userCities : any[]; userWeatherData: any[]; toggleSidebar: () => void; setWeatherCoords : Dispatch<SetStateAction<Coords | null>> }) {

  const [showForm, setShowForm] = useState<"login" | "register">("login");
  const {authState} = useAuth()



  return (
    <AnimatePresence>
      {isSideBarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />


          {/* Sidebar */}
          <motion.div
            className={`fixed left-0 z-70 w-96 max-w-[80%] h-screen border-r border-t rounded p-4 overflow-y-auto ${background}`}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="relative">
              <h2 className="text-center font-bold text-3xl py-4">Saved Cities</h2>

              <button
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full"
                onClick={toggleSidebar}
                aria-label="Close Sidebar"
              >
                <SquareChevronLeft size={24} />
              </button>
            </div>

            {authState ? (

              // if user doesnt have any saved cities
              userCities.length === 0 ? (
                <p className="text-center text-gray-600">No cities saved yet.</p>
              ) : (

              // if user has saved cities
              // saved cities container
              <div className="flex flex-col gap-4">

                {userWeatherData?.map((city: any, index: number) => {
                  const weather = city.current;
                  const daily = city.daily[0];
                  const cityName = userCities[index].name
                  console.log(cityName)

                  return (
                    // individual weather card
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 shadow cursor-pointer"
                      onClick={() => {
                        setWeatherCoords({lat: userWeatherData[index].lat, lon: userWeatherData[index].lon})
                        toggleSidebar()
                      }}
                    >
                      {/* Weather Info */}
                      <div>
                        <div className="flex items-center mb-2">
                          <MapPin size={20} />
                          <p className="font-bold text-lg ml-2">{cityName}</p>
                        </div>
                        <div className="text-sm">
                          <p>Temp: {Math.round(weather.temp)}°</p>
                          <p>Feels like: {Math.round(weather.feels_like)}°</p>
                          {daily && (
                            <>
                              <p>High: {Math.round(daily.temp.max)}°</p>
                              <p>Low: {Math.round(daily.temp.min)}°</p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Lottie Animation */}
                      <div className="w-20 h-20">
                        <Lottie
                          animationData={
                            WeatherAnimations[
                              GetWeatherAnimation(
                                weather.weather[0].id,
                                true,
                                weather.wind_speed
                              )
                            ]
                          }
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              )
            ) : (
              <>
                <p className="text-center mb-4">
                  Sign in or register to save your favorite cities!
                </p>

                {/* Show the selected form */}
                {showForm === "login" && <SignInForm showForm={setShowForm}/>}
                {showForm === "register" && <RegisterForm showForm={setShowForm}/>}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
