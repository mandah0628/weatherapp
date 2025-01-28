import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_APP_BASE_URL,
});

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default async function fetchCities(query, limit = 10) {
  if (!query) return []; // If the query is empty, return an empty array.

  try {
    const endpoint =`/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${apiKey}`;
    const response = await apiClient.get(endpoint);
   
    return response.data; // Axios automatically parses JSON.

  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}
