import DisplayTime from "@/utils/DisplayTime";


export default function HourlyForecast({data} : any) {
    return (
        <div className=" bg-purple-500">
            <h1>Hourly forecast</h1>
            <ul>
            {data.slice(0, data.length).map((hourlyWeather : any, index : number) => (
                <li key={index}>
                    {`${DisplayTime(data[index].dt)}: ${Math.round(data[index].temp)}°`}
                </li>
            ))}
            </ul>
        </div>
    )
}