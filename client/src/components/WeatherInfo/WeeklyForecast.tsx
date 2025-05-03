export default function WeeklyForecast({data}){
    return(
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
    )
}