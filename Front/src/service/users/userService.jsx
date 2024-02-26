import axios from 'axios';
const API_URL_BASE = `${import.meta.env.VITE_SERVER_PRODUCTION}`;

export const changeLastPet = async (userId, petId) => {
  await axios
    .put(`${API_URL_BASE}/api/v1/user/lastpet/${userId}`, { petId: petId })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserById = async (userId) => {
  try {
    const user = (await axios.get(`${API_URL_BASE}/api/v1/user/${userId}`)).data;
    return user;
  } catch (error) {
    console.error(error.message);
    throw Error(error.message);
  }
};
