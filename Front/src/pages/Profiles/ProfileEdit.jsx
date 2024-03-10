import { useEffect, useState } from 'react';
import { PetEditForm } from '../../components/forms/PetEditForm';
import { getPetById } from '../../service/pets/petService';
import Spinner from '../../components/ui/Spinner';

export const ProfileEdit = () => {
  const { petId } = JSON.parse(localStorage.getItem('pet'));
  const [pet, setPet] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchProfileData(petId);
  }, []);

  const fetchProfileData = async () => {
    const pet = (await getPetById(petId)).data;
    setPet(pet.data);
    setIsLoading(false);
  };
  return <main>{isLoading ? <Spinner /> : <PetEditForm formPrevData={pet} />}</main>;
};
