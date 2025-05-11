import axios, {AxiosInstance} from "axios";

const env = process.env.NODE_ENV

// for gin server
export const AxiosBackend : AxiosInstance = axios.create({
    baseURL: env === "development" ? process.env.NEXT_PUBLIC_BACKEND_BASE_DEV_URL : process.env.BACKEND_BASE_URL,
    withCredentials: true
});

// for fetching weather data
export const AxiosWeather : AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEATHER_API_URL
});

//for direct and reverse geocoding
export const AxiosGeolocation : AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GEOLICATION_API_URL
});

