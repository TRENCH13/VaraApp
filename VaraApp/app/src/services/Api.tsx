import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.99",
});
api.interceptors.request.use(
    (config) => {
        /*console.log("URL completa de la solicitud:", config.baseURL + config.url)*/ return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default api;