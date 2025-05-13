import FetchCityDirect from "./GetCityDirect"
import FetchWeather from "./GetWeather"


export const canadianCities : any[] = [
    { name: "Calgary", state: "AB", country: "CA" },
    { name: "Toronto", state: "ON", country: "CA" },
    { name: "Vancouver", state: "BC", country: "CA" },
    { name: "Halifax", state: "NS", country: "CA" },
    { name: "Montreal", state: "QC", country: "CA" },
    { name: "Regina", state: "SK", country: "CA" },
]

/**
 * Fetches weather data of multiple cities using direct geocoding by using: name, state(optional), city
 * @param cities An array of city objects, each containing name, state(code) and country(code).
 * @returns A promise that resolves into an array of weather data objects.
 * Throws an error if rejected.
 */
export default async function GetMultipleWeather(cities : any[]= canadianCities) : Promise<any[]>{
    
    try {
        // get an array of geo data of each city: name, state code, country code, lat lon
        const geoDataArr :any[] = await Promise.all(cities.map((city :any) => 
            FetchCityDirect({
                name: city.name, state: city.state, country: city.country 
            }) 
        ))

        // get an array of weather data of each city
        const weatherDataArr :any[] = await Promise.all(geoDataArr.map((city) => 
            FetchWeather({
                lat: city.lat, lon: city.lon
            }) 
        ))

        return weatherDataArr
    } catch (error) {
        console.error(error)
        return []
    }
} 