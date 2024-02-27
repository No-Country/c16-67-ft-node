import { useEffect, useState } from 'react';
import { getPetsByName, getPetById } from '../../service/pets/petService';
import { PetProfileCard } from './PetProfileCard';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router';

export const PetsProfilesContainer = ({ inputName }) => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchPets();
  }, [inputName]);

  const fetchPets = async () => {
    try {
      const petsData = await getPetsByName(inputName);
      setPets(petsData.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const profilePet = async (petId) => {
    try {
      const petsData = await getPetById(petId);
      navigate(`/profile/${petId}`);
      setPets(petsData.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {pets.length !== 0 ? (
            <div>
              {pets.map((pet) => (
                <PetProfileCard
                  key={pet.petId}
                  name={pet.name}
                  image={pet.image_url}
                  altText={`Image of ${pet.name}`}
                  onClick={() => profilePet(pet.petId)}
                />
              ))}
            </div>
          ) : (
            <div>0 pets founded with that word</div>
          )}
        </>
      )}
    </section>
  );
};
