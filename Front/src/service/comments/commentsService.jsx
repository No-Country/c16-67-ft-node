import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const getPetCommentsById = async (postId) => {
  return await axios
    .get(`${API_URL_BASE}/api/v1/comment/postid/${postId}`)
    .catch((err) => console.log(err));
};

export const createPetComments = async (commentId) => {
  return await axios
    .post(`${API_URL_BASE}/api/v1/comment/`, commentId)
    .catch((err) => console.log(err));
};
