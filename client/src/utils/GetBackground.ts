export default function GetBackground(timeData : any) :string{
    const { sunrise, sunset, timestamp, offset } = timeData;

    const adjustedTimestamp :number = timestamp + offset
    const adjustedSunrise :number = sunrise + offset
    const adjustedSunset : number = sunset + offset

    const noonStart :number= (adjustedSunrise + adjustedSunset) / 2
    const eveningStart :number = adjustedSunset - 5400
    const nightStart :number = adjustedSunset + 1800
    
    //night
    if (adjustedTimestamp < adjustedSunrise || adjustedTimestamp > nightStart) {
        return "bg-gradient-to-t from-indigo-800 to-purple-900 text-white"
    //morning
    } else if (adjustedTimestamp >= adjustedSunrise && adjustedTimestamp < noonStart) {
        return "bg-gradient-to-t from-amber-400 via-teal-50 to-cyan-200"
    //noon
    } else if (adjustedTimestamp >= noonStart && adjustedTimestamp < eveningStart) {
        return "bg-gradient-to-t from-cyan-300 to-blue-600"
    //evening
    } else {
        return "bg-gradient-to-t from-orange-500 to-purple-900 text-white"
    }
}