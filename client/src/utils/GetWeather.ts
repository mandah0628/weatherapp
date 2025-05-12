import { AxiosWeather } from '@/utils/Axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export interface Coords {
    lat: number;
    lon: number;
}

/**
 * Fetches a city's weather data using the lat and lon.
 * @param cityCoords An object containing the city's coords: lat and lon.
 * @returns A promise that resolves into an object containing the weather data.
 */
export default async function GetWeather(cityCoords :Coords) :Promise<any | null>{
    try{
        const queryString  =`/onecall?lat=${cityCoords.lat}&lon=${cityCoords.lon}&units=metric&appid=${API_KEY}`;
        const res = await AxiosWeather.get(queryString);
        const data = res.data
        return data
        
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}