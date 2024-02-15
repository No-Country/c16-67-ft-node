import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_CONNECT;

export const getPublications = async () => {
    const publications = (await axios.get(`${API_URL_BASE}api/v1/publication?type=perdido`)).data;
    return publications;
};