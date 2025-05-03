export default function HourlyForecast({data}) {
    return (
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
    )
}