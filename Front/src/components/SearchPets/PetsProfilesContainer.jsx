import { useEffect, useState } from 'react';
import { getPetsByName } from '../../service/pets/petService';
import { PetProfileCard } from './PetProfileCard';
import Spinner from '../ui/Spinner';

export const PetsProfilesContainer = ({ inputName }) => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchPets();
  }, [inputName]);

  const fetchPets = async () => {
    const pets = await getPetsByName(inputName);
    setPets(pets.data);
    setIsLoading(false);
  };

  return (
    <section>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {pets.map((pet) => (
            <PetProfileCard
              key={pet.petId}
              name={pet.name}
              image={pet.image_url}
              altText={`Image of ${pet.name}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
