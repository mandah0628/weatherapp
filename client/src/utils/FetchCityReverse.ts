import { AxiosGeolocation } from "./Axios";
import { Coords } from "./FetchWeather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;



export interface CityDirectResult {
    name: string;
    state?: string;
    country: string;
    lat: number;
    lon:number
}

/**
 * User city lat and lon to retrieve the city info: name, state, country, lat, lon
 * @param cityCoords An object containing lat and lon
 * @returns Returns a promise that resolves into an object containing name, state(code), country(code), lat, lon.
 * Returns null if rejected.
 */
export default async function FetchCityReverse(cityCoords: Coords) : Promise<CityDirectResult | null> {
    try {
        const queryString = `/reverse?lat=${cityCoords.lat}&lon=${cityCoords.lon}&limit=${1}&appid=${API_KEY}`
        const res = await AxiosGeolocation.get(queryString)
        const data = res.data?.[0]

        if (!data) {
            return null
        }

        return {
            name: data.name,
            state: data.state,
            country: data.country,
            lat: data.lat,
            lon: data.lon
        }
    } catch (error) {
        console.error(error)
        return null
    }
}