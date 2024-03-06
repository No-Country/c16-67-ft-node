import { useEffect, useState } from 'react';
import { getPetsByName } from '../../service/pets/petService';
import { PetProfileCard } from './PetProfileCard';
import Spinner from '../ui/Spinner';

export const PetsProfilesContainer = ({ inputName }) => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchPets();
  }, [inputName, userId]);

  const fetchPets = async () => {
    const petsData = await getPetsByName(inputName);
    const filteredPets = petsData.data.filter((pet) => pet.userId !== userId);
    setPets(filteredPets);
    setIsLoading(false);
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
                  username={pet.username}
                  image={pet.image_url}
                  altText={`Image of ${pet.name}`}
                  petId={pet.petId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-body-lg font-semibold md:text-headline-sm">
              0 pets founded with that word
            </div>
          )}
        </>
      )}
    </section>
  );
};
