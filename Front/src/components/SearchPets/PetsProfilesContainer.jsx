import { useEffect, useState } from 'react';
import { getPetsByName } from '../../service/pets/petService';
import { PetProfileCard } from './PetProfileCard';

export const PetsProfilesContainer = ({ inputName }) => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetchPets();
  }, [inputName]);

  const fetchPets = async () => {
    const pets = await getPetsByName(inputName);
    setPets(pets.data);
  };

  return (
    <section>
      {pets.map((pet) => (
        <PetProfileCard
          key={pet.id}
          name={pet.name}
          image={pet.image_url}
          altText={`Image of ${pet.name}`}
        />
      ))}
    </section>
  );
};
