import axios from "axios";

// Node Medical Microservice
const BASE_URL = "http://localhost:8084/medical-records";

const getToken = () => sessionStorage.getItem("token");

// Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

// Attach JWT token automatically
api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Normalize response to always return data
const handleResponse = async (promise) => {
    try {
        const response = await promise;
        return response.data;
    } catch (error) {
        console.error("API Error:", error?.response?.data || error.message);
        return [];
    }
};

// ================= APIS =================

// GET /medical-records
export const getAllRecords = () => {
    return handleResponse(api.get("/"));
};

// GET /medical-records/search?text=
export const searchRecords = (text) => {
    return handleResponse(
        api.get("/search", {
            params: { text }
        })
    );
};

// GET /medical-records/date?date=
export const filterByDate = (date) => {
    return handleResponse(
        api.get("/date", {
            params: { date }
        })
    );
};

// GET /medical-records/my  (patient page)
export const getMyRecords = () => {
    return handleResponse(api.get("/my"));
};

export default api;
