export default function CalculateCurrentWeek(dailyData : any) : string[]{
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // converts unix time to ms and get a Date object
    const date : Date = new Date(dailyData[0].dt * 1000);
    // gets the day of the week
    const currentDayIndex : number = date.getDay();

    // slice from sunday to before current day
    const beforeCurrent : string[] = weekdays.slice(0,currentDayIndex);
    // slice from current day until the end of the week
    const currentAndAfter : string[] = weekdays.slice(currentDayIndex);

    // creates an array of the weekdays relative to the current day
    const currentWeek : string[] = beforeCurrent.concat(currentAndAfter);
    return currentWeek;
}