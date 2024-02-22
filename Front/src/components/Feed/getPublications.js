import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const getPublications = async (activeFeed) => {
  if (activeFeed === 'Feed') {
    //publicaciones NORMALES
    const publications = (await axios.get(`${API_URL_BASE}/api/v1/publication`)).data;
    return publications.data;
  } else {
    //publicaciones /PERDIDOS/ADOPCION
    const publications = (await axios.get(`${API_URL_BASE}/api/v1/publication/filtered`)).data;
    console.log(publications);
    return publications.data;
  }
};
