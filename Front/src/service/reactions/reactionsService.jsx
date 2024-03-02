import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const getPetReactionsById = async (postId) => {
  return await axios
    .get(`${API_URL_BASE}/api/v1/reaction/${postId}`)
    .catch((err) => console.log(err));
};

export const sendPetReactions = async (body) => {
  return await axios
    .post(`${API_URL_BASE}/api/v1/reaction/`, body)
    .catch((err) => console.log(err));
};

export const deletePetReactionsById = async (reactionId) => {
  return await axios
    .put(`${API_URL_BASE}/api/v1/reaction/deleted/${reactionId}`)
    .catch((err) => console.log(err));
};
