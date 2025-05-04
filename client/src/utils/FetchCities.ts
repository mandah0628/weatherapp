import { AxiosGeolocation } from "./Axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default async function fetchCities(query : string, limit : number = 10) {
  if (!query) return []; 

  try {
    const queryString =`/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`;
    const res = await AxiosGeolocation.get(queryString);
   
    return res.data; 

  } catch (error) {
    return [];
  }
}
