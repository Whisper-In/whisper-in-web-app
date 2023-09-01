import axios from "axios"
import { cookies } from "next/headers"

console.log(process.env.SERVICE_URL);

const axiosInstance = axios.create({
    baseURL: process.env.SERVICE_URL
});

axiosInstance.interceptors.request.use((config) => {
    const token = cookies().get("token")?.value;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
export default axiosInstance;