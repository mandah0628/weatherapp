import FetchCanadianCities, { cities } from "@/utils/FetchCanadianCities";
import GetWeatherAnimation from "@/utils/GetWeatherAnimation";
import Lottie from "lottie-react";
import { useEffect, useState } from "react"
import { MapPin } from "lucide-react";

export default function ExtraCities({updateCoords} :any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const canadianCities = await FetchCanadianCities()
                setData(canadianCities)
                console.log(canadianCities)
            } catch (error) {
                console.error()
            } finally {
                setLoading(false)
            }
        })();
    }, [])


    if(loading || !data){
        return
    }

    return (
        <div className="w-full h-full p-4">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
            {data.slice(0, 6).map((cityData: any, index: number) => (
              <div
                key={index}
                className="bg-green-400 p-3 rounded-xl flex flex-col justify-between cursor-pointer"
                onClick={() =>
                  updateCoords({ lat: cityData.data.lat, lon: cityData.data.lon })
                }
              >
                <div>
                  <div className="flex items-center">
                    <MapPin size={20} />
                    <p className="font-bold ml-2">{cities[index].city}</p>
                  </div>
      
                  <div className="text-sm mt-2">
                    <p>Temp: {Math.round(cityData.data.current.temp)}°</p>
                    <p>Feels like: {Math.round(cityData.data.current.feels_like)}°</p>
                    <p>High: {Math.round(cityData.data.daily[0].temp.max)}°</p>
                    <p>Low: {Math.round(cityData.data.daily[0].temp.min)}°</p>
                  </div>
                </div>
      
                <div className="max-w-60">
                  <Lottie
                    animationData={require(`../../../public/${GetWeatherAnimation(
                      cityData.data.current.weather[0].id,
                      true,
                      cityData.data.current.wind_speed
                    )}`)}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}