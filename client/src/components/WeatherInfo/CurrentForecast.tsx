import DisplayTime from "@/utils/DisplayTime"
import UvIndexToText from "@/utils/UvIndexToText"

export default function CurrentForecast({data}) {
    return (
        <div>
            <h1>{data.cityName}</h1>
            <p>Time: {DisplayTime(data.current.dt)}</p>
            <p>Temperature: {Math.round(data.current.temp)}°C, Feels like: {Math.round(data.current.feels_like)}°C</p>
            <p>{data.current.weather[0].description}</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind: {Math.round(data.current.wind_speed)} m/s</p>
            <p>UV index: {UvIndexToText(data.current.uvi)} ({Math.round(data.current.uvi)})</p>
            <p>Chance of Precipitation: {Math.round(data.hourly[0].pop * 100)}%</p>
        </div>
    )
}