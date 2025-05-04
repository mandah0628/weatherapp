export default function GetWeatherAnimation(code:number, isNight : boolean, windSpeed : number) :string{
    const isWindy :  boolean = windSpeed > 11
    switch (true) {
        // thunderstorm
        case code >= 200 && code < 300:
            return "thunderstorm.json";
    
        // drizzle
        case code >= 300 && code < 400:
          return "drizzle.json";
    
        // rain
        case code >= 500 && code < 600:
          return "rain.json";
    
        // snow
        case code >= 600 && code <= 610:
          return "snow.json";

        // snow and rain
        case code >= 611 && code < 700:
            return "snowandrain.json"

        // fog and mist
        case code === 701 || code === 741:
          return "fog.json";

        // smoke and pollutants
        case [711,721,731,751,761,762].includes(code):
          return "smoke.json"; 
    
        // clear skies
        case code === 800:
            return isWindy ? "windy.json" : (isNight ? "clearnight.json" : "clearday.json")
    
        // few clouds
        case code === 801:
            return isWindy ? "windy.json" : (isNight ? "cloudynight.json" : "cloudyday.json")
    
        // clouds
        case [802,803,804].includes(code):
          return isWindy ? "windy.json" : "cloudy.json"
    
        default:
          return "default-weather.json";
      }
}