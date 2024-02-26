import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const createPet = async (payload) => {
  return await axios.post(`${API_URL_BASE}/api/v1/pet`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
