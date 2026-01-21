import axios from "axios";

const BASE_URL = "http://localhost:8080/api/medical-records";

export const getAllRecords = () => {
    return axios.get(BASE_URL);
};

export const searchRecords = (query) => {
    return axios.get(`${BASE_URL}/search`, {
        params: { query }
    });
};

export const filterByDate = (date) => {
    return axios.get(`${BASE_URL}/filter`, {
        params: { date }
    });
};
