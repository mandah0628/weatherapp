import DisplayTime from "@/utils/DisplayTime";
import UvIndexToText from "@/utils/UvIndexToText";

export default function CurrentForecast({ currentWeather }:  any ) {
  if (!currentWeather) return <p>Loading current weather...</p>;

  return (
    <div>
      <h1>{currentWeather.cityName}</h1>
      <p>Time: {DisplayTime(currentWeather.dt)}</p>
      <p>
        Temperature: {Math.round(currentWeather.temp)}°C, Feels like:{" "}
        {Math.round(currentWeather.feels_like)}°C
      </p>
      <p>{currentWeather.weather[0].description}</p>
      <p>Humidity: {currentWeather.humidity}%</p>
      <p>Wind: {Math.round(currentWeather.wind_speed)} m/s</p>
      <p>
        UV index: {UvIndexToText(currentWeather.uvi)} ({Math.round(currentWeather.uvi)})
      </p>
      <p>Chance of Precipitation: {Math.round(currentWeather.precipitation)}%</p>
    </div>
  );
}
