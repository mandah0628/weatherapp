/**
 * Uses the weather code, daytime or nighttime, wind speed to get the file name of the right weather animation.
 * @param code The weather code.
 * @param isDay If its daytime.
 * @param windSpeed Wind speed in m/s.
 * @returns The file name.
 */
export default function GetWeatherAnimation(code:number, isDay : boolean, windSpeed : number) :string{
    const isWindy = windSpeed > 11

    switch (true) {
        // thunderstorm
        case code >= 200 && code < 300:
            return "thunderstorm.json";
    
        // drizzle
        case code >= 300 && code < 400:
          return "drizzle.json";
    
        // rain
        case code >= 500 && code < 600:
          return "rainy.json";
    
        // snow
        case code >= 600 && code <= 610:
          return "snowy.json";

        // snow and rain
        case code >= 611 && code < 700:
            return "snowandrainy.json"

        // fog and mist
        case code === 701 || code === 741:
          return "foggy.json";

        // smoke and pollutants
        case [711,721,731,751,761,762].includes(code):
          return "smoky.json"; 
    
        // clear skies
        case code === 800:
            return isWindy ? "windy.json" : (isDay ? "clearday.json" : "clearnight.json")
    
        // few clouds
        case code === 801:
            return isWindy ? "windy.json" : (isDay ? "cloudyday.json" : "cloudynight.json")
    
        // clouds
        case [802,803,804].includes(code):
          return isWindy ? "windy.json" : "cloudy.json"
    
        default:
          return "default-weather.json";
      }
}