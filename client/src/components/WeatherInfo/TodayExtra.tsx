import DisplayTime from "@/utils/DisplayTime"
import UvIndexToText from "@/utils/UvIndexToText"
import VisibilityToText from "@/utils/VisibilityToText"
import Lottie from "lottie-react"


export default function TodayExtra({data, timezoneOffset} : {data : any, timezoneOffset : number}) {
    return (
        <div className="w-full h-full flex flex-row items-center justify-evenly text-xl sm:text-2xl font-medium border rounded-2xl text-center">

            {/* left div */}
            <div className="flex flex-col items-center h-full justify-evenly flex-1">

                <div className="flex flex-col items-center">
                    <p>Sunrise: {DisplayTime(data.sunrise + timezoneOffset)}</p>
                    <div className="w-36 h-36">
                        <Lottie
                            animationData={require("../../../public/clearday.json")}
                            style={{width:"100%", height:"100%"}}
                        > </Lottie>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <p>Sunset: {DisplayTime(data.sunset+timezoneOffset)}</p>
                    <div className="w-36 h-36">
                        <Lottie
                            animationData={require("../../../public/clearnight.json")}
                            style={{width:"100%", height:"100%"}}
                        > </Lottie>
                    </div>
                </div>
                
                <div className="flex flex-col items-center">
                    <p className="w-fit">UVI: {UvIndexToText(data.uvi)}</p>
                    <div className="w-36 h-36">
                        <Lottie
                            animationData={require("../../../public/uvIndex.json")}
                            style={{width:"100%", height:"100%"}}
                        > </Lottie>
                    </div>
                </div>
            </div>


            {/* right div */}
            <div className="flex flex-col items-center justify-evenly h-full flex-1 ">
                <div className="flex flex-col items-center">
                    <p>Wind: {Math.round(data.wind_speed)}m/s</p>
                    <div className="w-36 h-36">
                        <Lottie
                            animationData={require("../../../public/windy.json")}
                            style={{width:"100%", height:"100%"}}
                        > </Lottie>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <p>Humidity: {data.humidity}%</p>
                    <div className="w-36 h-36">
                        <Lottie
                            animationData={require("../../../public/humidity.json")}
                            style={{width:"100%", height:"100%"}}
                        > </Lottie>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <p className="flex-1">Visibity: {VisibilityToText(data.visibility)}</p>    
                    <div className="w-36 h-36">
                        <Lottie
                            animationData={require("../../../public/visibility.json")}
                            style={{width:"100%", height:"100%"}}
                        > </Lottie>
                    </div>
                </div>
            </div>

        </div>
    )
}