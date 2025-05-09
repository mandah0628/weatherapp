import { AxiosGeolocation } from "./Axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default async function FetchCityDirect(cityInfo: any) : Promise<any> {
    try {
        const queryString = `/direct?q=${cityInfo?.city},${cityInfo?.province},CA&limit=1&appid=${API_KEY}`
        const res = await AxiosGeolocation.get(queryString)
        return res.data?.[0]
    } catch (error) {
        console.error(error)
        return null
    }
}