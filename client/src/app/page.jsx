import displayTime  from "@/utils/displayTime";
import calculateCurrentWeek from "@/utils/calculateCurrentWeek";
import uvIndex from "@/utils/uvIndex";
import visibility from "@/utils/visibility";


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
      <div className="bg-red-400">
        <h1>{cityName}</h1>
        <p>Time: {displayTime(weatherData.current.dt)}</p>
        <p>Temperature: {Math.round(weatherData.current.temp)}°C, Feels like: {Math.round(weatherData.current.feels_like)}°C</p>
        <p>{weatherData.current.weather[0].description}</p>
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Wind: {Math.round(weatherData.current.wind_speed)} m/s</p>
        <p>UV index: {uvIndex(weatherData.current.uvi)} ({Math.round(weatherData.current.uvi)})</p>
        <p>Chance of Precipitation: {Math.round(weatherData.hourly[0].pop * 100)}%</p>
      </div>


      {/*Weekly weather*/}
      <div className="flex flex-col justify-center content-center bg-green-500">
        <h1>Weekly forecast</h1>
        <ul>
        {currentWeek.slice(0, weatherData.daily.length).map((day, index) => (
          <li key={index}>
            {day === currentDay ? "Today" : day}: {Math.round(weatherData.daily[index].temp.max)}°/{Math.round(weatherData.daily[index].temp.min)}°
          </li>
        ))}
        </ul>
      </div>


      {/*Hourly weather*/}
      <div className=" bg-purple-500">
          <h1>Hourly forecast</h1>
          <ul>
          {hourly.slice(0, 24).map((hourlyData, index) => (
            <li key={index}>
              {`${displayTime(hourlyData.dt)}: ${Math.round(hourlyData.temp)}°`}
            </li>
            ))}
          </ul>
      </div>


      {/*Sunset,sunrise and other*/}
      <div className="bg-orange-400">
        {/*Sunrise*/}
        <div>
            <p>Sunrise:{displayTime(weatherData.current.sunrise)}</p>
        </div>

        {/*Sunset*/}
        <div>
          <p>Sunset:{displayTime(weatherData.current.sunset)}</p>
        </div>

        {/*Visibility*/}
          <p>Visibity: {visibility(weatherData)}</p>
      </div>
    </div>
  );
}