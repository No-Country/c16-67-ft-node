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

export const getPublicationsSaved = async () => {
  const pet = JSON.parse(localStorage.getItem('pet'));

  if (pet === null) {
    return [];
  }
  const response = await axios.get(`${API_URL_BASE}/api/v1/save/${pet.petId}`).catch((error) => {
    console.error(error);
  });
  return response.data.data;
};

export const postPublication = async (publication) => {
  return await axios.post(`${API_URL_BASE}/api/v1/publication`, publication, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getPublicationsByPetId = async (petId) => {
  try {
    const publications = (await axios.get(`${API_URL_BASE}/api/v1/publication/petid/${petId}`))
      .data;
    return publications;
  } catch (error) {
    console.error(error.message);
    throw Error(error.message);
  }
};