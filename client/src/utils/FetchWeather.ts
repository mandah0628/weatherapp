import { AxiosWeather } from '@/utils/Axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

/**
 * 
 * @param lat 
 * @param lon 
 * @returns 
 */
export default async function FetchWeather(lat : string, lon : string){
    try{
        const queryString  =`/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const res = await AxiosWeather.get(queryString);
    
        return res;
        
    } catch (error) {
        console.error("Error fetching data:", error)
        return null;
    }
}