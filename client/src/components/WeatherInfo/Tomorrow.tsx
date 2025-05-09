import Capitalize from "@/utils/Capitalize"
import GetWeatherAnimation from "@/utils/GetWeatherAnimation"
import Lottie from "lottie-react"

export default function({tomorrowData} :any) {
    return (
        <div className="w-full flex flex-row 2xl:flex-col 2xl:justify-around justify-between items-center text-2xl font-medium text-center h-[90%]" title={tomorrowData.summary}>
            <div className="flex flex-col pl-5 gap-5 h-fit">
                <p className="font-bold">Tomorrow: {Math.round(tomorrowData.temp.max)}°C</p>
                <p>Feels like: {Math.round(tomorrowData.feels_like.day)}°C</p>
                <p>Condition: {tomorrowData.weather[0].description}</p>
                
            </div>
            
            <div className="flex flex-col items-center justify-center pr-5 h-fit">
                <div className="flex-1">
                    <Lottie
                        animationData={require(`../../../public/${GetWeatherAnimation(tomorrowData.weather[0].id, true, tomorrowData.wind_speed)}`)}
                        style={{width:"100%", height:"100%"}}
                    > </Lottie>
                    <p>{Capitalize(tomorrowData.weather[0].description)}</p>
                </div>
                
            </div>
            
        </div>
    )
}