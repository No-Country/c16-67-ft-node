import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const getPetSuggestions = async (userId, limit) => {
  return await axios
    .get(`${API_URL_BASE}/api/v1/pet/suggestion/${userId}?limit=${limit}`)
    .catch((err) => console.log(err));
};

export const getPetCommentsById = async (postId) => {
  return await axios
    .get(`${API_URL_BASE}/api/v1/comment/postid/${postId}`)
    .catch((err) => console.log(err));
};

export const getPetById = async (petId) => {
  return await axios.get(`${API_URL_BASE}/api/v1/pet/${petId}`).catch((error) => {
    console.log(error);
  });
};

export const getPetsByUserId = async (userId) => {
  try {
    const pets = (await axios.get(`${API_URL_BASE}/api/v1/pet/userid/${userId}`)).data;
    return pets;
  } catch (error) {
    console.error(error.message);
    throw Error(error.message);
  }
};

export const getPetsByName = async (name) => {
  try {
    const pets = (await axios.get(`${API_URL_BASE}/api/v1/pet?name=${name}`)).data;
    return pets;
  } catch (error) {
    console.error(error.message);
    throw Error(error.message);
  }
};
