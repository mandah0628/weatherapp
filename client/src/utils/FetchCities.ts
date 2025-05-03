import { AxiosGeolocation } from "./Axios";

const apiKey = process.env.OPENWEATHER_API_KEY;

export default async function fetchCities(query, limit = 10) {
  if (!query) return []; 

  try {
    const queryString =`/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${apiKey}`;
    const res = await AxiosGeolocation.get(queryString);
   
    return res.data; 

  } catch (error) {
    return [];
  }
}
