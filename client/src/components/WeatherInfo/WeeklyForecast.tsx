"use client"

import CalculateCurrentWeek from "@/utils/CalculateCurrentWeek"
import GetWeatherAnimation from "@/utils/GetWeatherAnimation"
import WeatherAnimations from "@/utils/WeatherAnimations"
import Lottie from "@/utils/LottieClient";

export default function WeeklyForecast({dailyData, time,timezoneOffset} : {dailyData :any, time :number, timezoneOffset :number}){
    const currentWeekdays : string[] = CalculateCurrentWeek(time + timezoneOffset)

    return(
        <div className=" flex flex-col justify-evenly w-full h-full font-medium text-center text-xl">
            <div className="flex flex-col w-full gap-2 flex-1">
                {dailyData.map((dayWeather : any, index : number) => (
                   
                <div className="flex gap-4 items-center flex-1" key={index}>

                    <div className="flex-1 ml-2 ">
                        {index === 0 ? "Today" : currentWeekdays[index].slice(0,3)}
                    </div>

                    <div className="h-24 w-24 flex-1">
                        <Lottie 
                            animationData={WeatherAnimations[GetWeatherAnimation(dayWeather.weather[0].id, true, dayWeather.wind_speed)]}
                            style={{width:"100%", height:"100%"}}
                        >
                        </Lottie>
                    </div>

                    <div className="flex-1">
                        {Math.round(dailyData[index].temp.max)}°/{Math.round(dailyData[index].temp.min)}°
                    </div>

                    <div className="flex-1 mr-2">
                        <p className="w-fit"> Condition: {dailyData[index].weather[0].description} </p>
                    </div>

                </div>
                ))}
            </div>
        </div>
    )
}