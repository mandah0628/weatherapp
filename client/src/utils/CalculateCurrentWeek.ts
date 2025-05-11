/**
 * Reorganizes an array in the order of the current week
 * @param offsetAdjustedTime Offset adjusted unix timestamp in seconds
 * @returns An array of strings, in the right order relative to today
 */
export default function CalculateCurrentWeek(offsetAdjustedTime: number) : string[]{
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
       
    // build a Date object from the timestamp
    const localDate = new Date(offsetAdjustedTime * 1000)

    // gets the day of the week
    const currentDayIndex = localDate.getUTCDay();

    // slice from sunday to before current day
    const beforeCurrent = weekdays.slice(0,currentDayIndex);
    // slice from current day until the end of the week
    const currentAndAfter = weekdays.slice(currentDayIndex);

    // creates an array of the weekdays relative to the current day
    const currentWeek = currentAndAfter.concat(beforeCurrent);

    return currentWeek;
}