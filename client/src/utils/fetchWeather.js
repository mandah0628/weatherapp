import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ONECALL_API_URL,
});

const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function fetchWeather(lat,lon){
    try{
        const endpoint  =`/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await apiClient.get(endpoint);
    
        return response.data;
        
    } catch (error) {
        console.error("Error fetching data:", error)
        return null;
    }
}