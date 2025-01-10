export default function WeatherInfo({weatherData})
{
  return(
    <div>
      <p>Temperature: {weatherData.current.temp}°C</p>
      <p>Feels like: {weatherData.current.feels_like}°C</p>
      <p>Humidity: {weatherData.current.humidity}%</p>
      <p>Wind: {weatherData.current.wind_speed} m/s</p>
    </div>
  );
}