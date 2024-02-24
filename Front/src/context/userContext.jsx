import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
const API_URL_BASE = `${import.meta.env.VITE_SERVER_PRODUCTION}`;

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [petId, setPetId] = useState('');
  const [petName, setPetName] = useState('');
  const [petImage, setPetImage] = useState('');
  const [petDescription, setPetDescription] = useState('');

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId !== null) {
      setUserId(userId);
      const pet = JSON.parse(localStorage.getItem('pet'));
      if (pet !== null) {
        setActivePet(pet);
      }
    }
  }, []);

  const loginContext = (userId, last_pet) => {
    console.log(userId);
    setUserId(userId);
    localStorage.setItem('userId', JSON.stringify(userId));
    console.log(last_pet);
    if (last_pet === null) {
      console.log('No pet');
      return;
    } else {
      axios
        .get(`${API_URL_BASE}/api/v1/pet/${last_pet}`)
        .then((response) => {
          setActivePet(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const logoutContext = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('pet');
    setUserId('');
    setPetId('');
    setPetImage('');
    setPetName('');
    setPetDescription('');
    axios.put(`${API_URL_BASE}/api/v1/user/lastpet/${userId}`, { petId: petId }).catch((error) => {
      console.log(error);
    });
  };

  const setActivePet = (pet) => {
    setPetId(pet.petId);
    setPetName(pet.name);
    setPetImage(pet.image_url);
    setPetDescription(pet.description);
    localStorage.setItem(
      'pet',
      JSON.stringify({
        petId: pet.petId,
        name: pet.name,
        image_url: pet.image_url,
        description: pet.description
      })
    );
  };

  const getPet = () => {
    return {
      petId: petId,
      name: petName,
      image_url: petImage,
      description: petDescription
    };
  };

  return (
    <UserContext.Provider
      value={{
        loginContext,
        logoutContext,
        setActivePet,
        getPet,
        userId,
        petId,
        petName,
        petImage,
        petDescription
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
