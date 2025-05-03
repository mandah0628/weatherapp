import axios from "axios";


const env = process.env.NODE_ENV

export const Axios = axios.create({
    baseURL: env === "development" ? process.env.BACKEND_BASE_DEV_URL : process.env.BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

