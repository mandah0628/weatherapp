import FetchCityDirect from "./FetchCityDirect"
import FetchWeather from "./FetchWeather"

export const cities : any[] = [
    {city: "Calgary", province: "AB"}, 
    {city:"Toronto", province: "ON"}, 
    {city: "Vancouver", province: "BC"},
    {city: "Halifax", province: "NS"}, 
    {city: "Montreal", province: "QC"}, 
    {city: "Regina", province: "SK"}
]

export default async function FetchCanadianCities() : Promise<any>{


    try {
        const cityData = await Promise.all(cities.map( (city) => FetchCityDirect(city) ))
        const weatherData = await Promise.all(cityData.map( (city) => FetchWeather(city.lat, city.lon) ))
        return weatherData
    } catch (error) {
        console.error(error)
    }
    
} 