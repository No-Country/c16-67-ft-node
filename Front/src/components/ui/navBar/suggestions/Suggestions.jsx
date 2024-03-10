import logo from '../../../../assets/images/isologo2.svg';
import { useEffect, useState } from 'react';
import SuggestionsModal from './SuggestionsModal';
import SuggestionItem from './SuggestionItem';
import { getPetSuggestions } from '../../../../service/pets/petService';

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
      <div>
        <img src={logo} className="w-full h-12" alt="logo" />
        <div className="flex mt-6 mb-4 gap-x-1 justify-between">
          <p>Suggestions for you</p>
          <p className="font-bold cursor-pointer" onClick={() => setIsModalOpen(true)}>
            See all
          </p>
        </div>
        {
          <div className="border shadow-md bg-whiteSmoke px-4 rounded-2xl">
            {pets.map((pet) => (
              <SuggestionItem key={pet.petId} pet={pet} />
            ))}
          </div>
        }
      </div>
      {isModalOpen && <SuggestionsModal setIsModalOpen={setIsModalOpen} />}
    </>
  );
}
