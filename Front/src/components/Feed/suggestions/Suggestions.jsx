import logo from '../../../assets/images/isologo2.svg';
import { useEffect, useState } from 'react';
import { getPetSuggestions } from '../../../service/pets/petService';
import SuggestionsModal from './SuggestionsModal';
import SuggestionItem from './SuggestionItem';

export default function Suggestions() {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getPetSuggestions(userId).then((response) => {
      setPets(response.data.data);
    });
  }, []);
  return (
    <>
      <div className="hidden xl:block xl:p-4 xl:flex-grow xl:basis-0">
        <img src={logo} className="w-full h-12" alt="logo" />
        <div className="flex mt-6 gap-x-1 justify-between">
          <p>Suggestions for you</p>
          <p className="font-bold cursor-pointer" onClick={() => setIsModalOpen(true)}>
            See all
          </p>
        </div>
        {
          <>
            {pets.map((pet) => (
              <SuggestionItem key={pet.petId} pet={pet} />
            ))}
          </>
        }
      </div>
      {isModalOpen && <SuggestionsModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
