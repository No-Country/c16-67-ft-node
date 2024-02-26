import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const postSave = async (body) => {
  return await axios.post(`${API_URL_BASE}/api/v1/save`, body).catch((err) => {
    console.error(err);
  });
};

export const deleteSaved = async (saveId) => {
  await axios.put(`${API_URL_BASE}/api/v1/save/deleted/${saveId}`).catch((err) => {
    console.error(err);
  });
};
