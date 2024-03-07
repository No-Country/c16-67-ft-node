import axios from 'axios';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export const createPet = async (formData) => {
  return await axios.post(`${API_URL_BASE}/api/v1/pet`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const setFormAndPostPet = ({
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
