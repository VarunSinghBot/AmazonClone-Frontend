import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

// Interceptor to attach JWT token to every request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance 