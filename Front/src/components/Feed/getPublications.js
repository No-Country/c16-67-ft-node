import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const getPublications = async (activeFeed) => {
  if (activeFeed === 'feed') {
    console.log(activeFeed);
    const publications = (await axios.get(`${API_URL_BASE}/api/v1/publication`)).data;
    return publications;
  } else {
    const publications = (await axios.get(`${API_URL_BASE}/api/v1/publication?type=perdido`)).data;
    return publications;
  }
};
