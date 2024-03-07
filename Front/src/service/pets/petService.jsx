import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const getPetSuggestions = async (userId, limit) => {
  return await axios
    .get(`${API_URL_BASE}/api/v1/pet/suggestion/${userId}?limit=${limit}`)
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

export const createPet = async (formData) => {
  return await axios.post(`${API_URL_BASE}/api/v1/pet`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const setFormAndPostPet = ({
  name,
  username,
  age,
  descriptions,
  profilePhoto,
  setIsLoading,
  setActivePet,
  changeLastPet,
  openModal,
  navigate
}) => {
  const fileInput = document.getElementById('fileInput');
  const userId = JSON.parse(localStorage.getItem('userId'));
  fileInput.files[0];

  const formData = new FormData();
  formData.append('name', name);
  formData.append('username', username);
  formData.append('age', age);
  formData.append('description', descriptions);
  formData.append('image', profilePhoto);
  formData.append('userId', userId);

  setIsLoading(true);

  createPet(formData)
    .then((response) => {
      setActivePet(response.data.data);
      changeLastPet(userId, response.data.data.petId).then(() => {
        openModal({
          description: 'Pet created successfully',
          chooseModal: false
        });
      });
      navigate('/');
    })
    .catch((error) => {
      openModal({
        description: `${error.response.data.message}`,
        chooseModal: false,
        error: true
      });
      setIsLoading(false);
    });
};

export const editPet = async (petId, inputsData, file) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('name', inputsData.name);
    formDataToSend.append('age', inputsData.age);
    formDataToSend.append('description', inputsData.description);
    formDataToSend.append('image_url', inputsData.image_url);

    if (file) {
      formDataToSend.append('image', file);
    }
    const petEdited = await axios.put(`${API_URL_BASE}/api/v1/pet/${petId}`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return petEdited.data;
  } catch (error) {
    console.error(error.message);
    throw Error(error.message);
  }
};

export const deletePetById = async (petId) => {
  return await axios
    .put(`${API_URL_BASE}/api/v1/pet/deleted/${petId}`)
    .catch((err) => console.log(err));
};
