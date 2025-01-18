import { displayTime } from "@/utils/displayTime";
import { GoogleMap,LoadScript, Marker } from "@react-google-maps/api";

export default function WeatherInfo({weatherData,cityName})
{
  if(!weatherData){
    return <p className="flex items-center justify-center h-full">Loading weather data...</p>
  }
  
  const { lat, lon } = weatherData;

  const containerStyle ={
    width:"600px",
    height:"400px",
  };


  const center = {
    lat,
    lng: lon,
  };
  
  return(
    <div className="flex">
      <div className="">
        <h1>{cityName}</h1>
        <p>Time: {displayTime(weatherData.current.dt)}</p>
        <p>Temperature: {weatherData.current.temp}°C, Feels like: {weatherData.current.feels_like}°C</p>
        <p>{weatherData.current.weather[0].description}</p>
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Wind: {weatherData.current.wind_speed} m/s</p>
        <p>UV index: {weatherData.current.uvi}</p>
        <p>Chance of Precipitation: {Math.round(weatherData.hourly[0].pop * 100)}%</p>
      </div>

      <div className="w-full h-full rounded-sm">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center}/>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}