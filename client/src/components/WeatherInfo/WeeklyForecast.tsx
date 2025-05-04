import CalculateCurrentWeek from "@/utils/CalculateCurrentWeek"

export default function WeeklyForecast({data} : any){
    const currentWeekdays : string[] = CalculateCurrentWeek(data)
    return(
        <div className="bg-green-500">
            <h1>Weekly forecast</h1>
            <ul>
                {currentWeekdays.slice(0,7).map((day : string, index : number) => (
                <li key={index}>
                    {index === 0 ? "Today" : currentWeekdays[index]}: {Math.round(data[index].temp.max)}°/{Math.round(data[index].temp.min)}°
                </li>
                ))}
            </ul>
        </div>
    )
}