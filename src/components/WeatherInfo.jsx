export default function WeatherInfo({weatherData})
{

  if(!weatherData){
    return <p className="flex items-center justify-center h-full">Loading weather data...</p>
  }
  return(
    <div>
      <p>Temperature: {weatherData.current.temp}°C</p>
      <p>Feels like: {weatherData.current.feels_like}°C</p>
      <p>Humidity: {weatherData.current.humidity}%</p>
      <p>Wind: {weatherData.current.wind_speed} m/s</p>
    </div>
  );
}