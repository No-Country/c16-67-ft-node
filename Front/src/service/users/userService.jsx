import axios from 'axios';
const API_URL_BASE = `${import.meta.env.VITE_SERVER_PRODUCTION}`;

export const changeLastPet = async (userId, petId) => {
  await axios
    .put(`${API_URL_BASE}/api/v1/user/lastpet/${userId}`, { petId: petId })
    .catch((error) => {
      console.log(error);
    });
};
