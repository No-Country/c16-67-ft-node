import { useEffect, useState } from 'react';
import { getPetsByName } from '../../service/pets/petService';
import { PetProfileCard } from './PetProfileCard';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router';

export const PetsProfilesContainer = ({ inputName, userId }) => {
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
      console.log(petsData);
      const filteredPets = petsData.data.filter((pet) => pet.petId !== userId);
      setPets(filteredPets);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
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
                  onClick={() => navigate(`/profile/${pet.petId}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-headline-sm">0 pets founded with that word</div>
          )}
        </>
      )}
    </section>
  );
};
