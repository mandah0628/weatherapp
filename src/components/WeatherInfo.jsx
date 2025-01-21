import displayTime  from "@/utils/displayTime";
import calculateCurrentWeek from "@/utils/calculateCurrentWeek";
import { GoogleMap,LoadScript, Marker } from "@react-google-maps/api";

export default function WeatherInfo({weatherData,cityName})
{
  if(!weatherData){
    return <p className="flex items-center justify-center h-full">Loading weather data...</p>
  }
  
  {/*Google map setup*/}
  const {lat, lon} = weatherData;

  const containerStyle ={
    width:"600px",
    height:"400px",
  };

  const center = {
    lat,
    lng: lon,
  };
  
  const currentWeek = calculateCurrentWeek(weatherData);
  const currentDay = currentWeek[0];
  console.log(weatherData);
  console.log(currentWeek);
  console.log(currentDay);

  return(
    <div className="flex">
      {/*Current weather*/}
      <div className="bg-red-400 w-400">
        <h1>{cityName}</h1>
        <p>Time: {displayTime(weatherData.current.dt)}</p>
        <p>Temperature: {weatherData.current.temp}°C, Feels like: {weatherData.current.feels_like}°C</p>
        <p>{weatherData.current.weather[0].description}</p>
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Wind: {weatherData.current.wind_speed} m/s</p>
        <p>UV index: {weatherData.current.uvi}</p>
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
      <div className="flex flex-col justify-center content-center">
        <h1>Weekly forecast</h1>
        <ul>
          {currentWeek.map((day,index) => (
            <li
              key={index}
              className=""
            >
              {day === currentDay? "Today" : day} : {Math.round(weatherData.daily[index].temp.max)}/{Math.round(weatherData.daily[index].temp.min)}
            </li>

          ))}
        </ul>
      </div>


      {/*Hourly weather*/}
      <div className=" ">

      </div>


      {/*Sunset,sunrise and other*/}
      <div className="">

      </div>
    </div>
  );
}