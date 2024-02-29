import { createContext, useContext, useEffect, useState } from 'react';
import { getPetById } from '../service/pets/petService';
import { changeLastPet } from '../service/users/userService';

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
      localStorage.setItem('pet', JSON.stringify(last_pet));
      return;
    } else {
      getPetById(last_pet).then((response) => {
        setActivePet(response.data.data);
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
    changeLastPet(userId, petId);
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
