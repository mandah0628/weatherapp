export default function calculateCurrentWeek(weatherData){
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // converts unix time to JS date and get the day of the week
    const date = new Date(weatherData.current.dt * 1000);
    const dayIndex = date.getDay();

    // weekday array slicing
    const beforeIndex = weekdays.slice(0,dayIndex);
    const afterIndex = weekdays.slice(dayIndex);

    // creates an array of the weekdays relative to the current day
    const newWeekdays = afterIndex.concat(beforeIndex);
    
    return newWeekdays;
}