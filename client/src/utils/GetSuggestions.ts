import { AxiosGeolocation } from "./Axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

/**
 * Uses the user input from the searchbox to fetch city suggestions
 * @param query The user input from the searchbox
 * @returns A promise that resolves into an array of city suggestions if matching result(s) are found
 * Empty array if there is no user input or if promise is rejected
 */
export default async function GetSuggestions(query : string) :Promise<any[]>{
  if (!query) {
    return []; 
  }
  
  try {
    const queryString =`/direct?q=${encodeURIComponent(query)}&limit=${4}&appid=${API_KEY}`;
    const res = await AxiosGeolocation.get(queryString);
   
    return res.data; 

  } catch (error) {
    return [];
  }
}
