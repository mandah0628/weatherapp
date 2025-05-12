import { AxiosGeolocation } from "./Axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export interface CityDirectQuery {
    name: string;
    state?: string;
    country: string;
}

export interface CityDirectResult {
    name: string;
    state?: string;
    country: string;
    lat: number;
    lon:number
}


/**
 * Uses city name, state code and country code to retrieve the city info: name, state, country, lat, lon.
 * @param cityData An object containing name, state code(optional) and country code
 * @returns  Returns a promise that resolves into an object containing name, state(code), country(code), lat, lon.
 * Returns null if rejected
 */
export default async function GetCityDirect(cityData :CityDirectQuery) :Promise<CityDirectResult | null> {
    try {
        const query = `${cityData.name},${cityData.state ? `${cityData.state},` : ""}${cityData.country}`
        const queryString = `/direct?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
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
