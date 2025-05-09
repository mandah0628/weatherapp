import { AxiosGeolocation } from "./Axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default async function FetchCityReverse(coords : any) : Promise<any> {
    if(Object.keys(coords).length === 0){
        return
    }

    try {
        const queryString = `/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=${1}&appid=${API_KEY}`
        const res = await AxiosGeolocation.get(queryString)
        return res.data?.[0]
    } catch (error) {
        console.error(error)
        return null
    }
}