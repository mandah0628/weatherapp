import axios, {AxiosInstance} from "axios";

const env = process.env.NODE_ENV

export const AxiosBackend : AxiosInstance = axios.create({
    baseURL: env === "development" ? process.env.BACKEND_BASE_DEV_URL : process.env.BACKEND_BASE_URL,
    withCredentials: true
});

export const AxiosWeather : AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEATHER_API_URL
});

export const AxiosGeolocation : AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GEOLICATION_API_URL
});

