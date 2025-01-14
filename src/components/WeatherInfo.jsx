import { capitalizeString } from '@/utils/capitalizeString'

export default function WeatherInfo({weatherData,cityName})
{
  if(!weatherData){
    return <p className="flex items-center justify-center h-full">Loading weather data...</p>
  }

  console.log(weatherData);
  
  return(
    <div className="flex">
      <div className="">
        
        <h1>{cityName}</h1>
        <p>Temperature: {weatherData.current.temp}°C</p>
        <p>{weatherData.current.weather[0].description}</p>
        <p>Feels like: {weatherData.current.feels_like}°C</p>
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Wind: {weatherData.current.wind_speed} m/s</p>
      </div>
    </div>
  );
}