import axios from "axios";
import Cookies from "js-cookie";

const service = axios.create({
    // baseURL: "https://admin.brotexbd.com/api",
    baseURL: "http://localhost:8000/api/",

    headers: {
        Accept: "application/json",
    },
});

service.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    };
    return config;
});

export default service;
