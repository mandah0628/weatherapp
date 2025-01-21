import displayTime  from "@/utils/displayTime";
import calculateCurrentWeek from "@/utils/calculateCurrentWeek";
import uvIndex from "@/utils/uvIndex";
import { GoogleMap,LoadScript, Marker } from "@react-google-maps/api";

export default function WeatherInfo({weatherData,cityName})
{
  if(!weatherData){
    return <p className="flex items-center justify-center h-full">Loading weather data...</p>
  }
  
  //Google map setup
  const {lat, lon} = weatherData;

  const containerStyle ={
    width:"600px",
    height:"400px",
  };

  const center = {
    lat,
    lng: lon,
  };

  //Weekly forecast setup
  const currentWeek = calculateCurrentWeek(weatherData);
  const currentDay = currentWeek[0];

  //Hourly forecast setup
  const {hourly} = weatherData;

  console.log(weatherData);
  
  return(
    <div className="flex">
      {/*Current weather*/}
      <div className="bg-red-400 w-400">
        <h1>{cityName}</h1>
        <p>Time: {displayTime(weatherData.current.dt)}</p>
        <p>Temperature: {Math.round(weatherData.current.temp)}°C, Feels like: {Math.round(weatherData.current.feels_like)}°C</p>
        <p>{weatherData.current.weather[0].description}</p>
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Wind: {Math.round(weatherData.current.wind_speed)} m/s</p>
        <p>UV index: {uvIndex(weatherData.current.uvi)} ({Math.round(weatherData.current.uvi)})</p>
        <p>Chance of Precipitation: {Math.round(weatherData.hourly[0].pop * 100)}%</p>
      </div>

      {/*Google Map Div*/}
      <div className="">
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

      {/*Weekly weather*/}
      <div className="flex flex-col justify-center content-center bg-green-500">
        <h1>Weekly forecast</h1>
        <ul>
          {currentWeek.map((day,index) => (
            <li
              key={index}
              className=""
            >
              {day === currentDay ? "Today" : day} : {Math.round(weatherData.daily[index].temp.max)}°/{Math.round(weatherData.daily[index].temp.min)}°
            </li>

          ))}
        </ul>
      </div>


      {/*Hourly weather*/}
      <div className=" bg-purple-500">
          <h1>Hourly forecast</h1>
          <ul>
            {hourly.map((hourlyData,index) => (
            <li
              key = {index}
              className=""
            >
              {index <= 24 ? `${displayTime(hourlyData.dt)}: ${Math.round(hourlyData.temp)}°` : ""}
            </li>
            ))}
          </ul>
      </div>


      {/*Sunset,sunrise and other*/}
      <div className="">
        {/**/}
            <div>

            </div>
      </div>
    </div>
  );
}