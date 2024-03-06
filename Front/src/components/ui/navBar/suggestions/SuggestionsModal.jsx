import React, { useEffect, useState } from 'react';
import SuggestionItems from './SuggestionItem';
import { getPetSuggestions } from '../../../../service/pets/petService';
import { FiX } from 'react-icons/fi';
import styles from './SuggestionsModal.module.css';
import Spinner from '../../Spinner';

export default function SuggestionsModal({ setIsModalOpen }) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    setIsLoading(true);
    getPetSuggestions(userId, 100)
      .then((response) => {
        setIsLoading(false);
        setPets(response.data.data);
      })
      .catch((e) => console.error(e));
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="fixed w-screen bg-blackOpacity left-0 top-0">
        <div
          className={`bg-white m-auto max-w-[648px] h-[calc(100dvh-192px)] overflow-auto my-24 rounded-3xl relative animate-appearOpen`}
        >
          <div className="mt-6 flex flex-col items-center gap-y-8">
            <div className="bg-gradient-to-r from-[#F06900] to-[#C31A02] w-44 h-1 rounded-full" />
            <h3 className="text-title-lg text-center font-bold">Suggestions for you</h3>
          </div>
          <FiX
            onClick={() => setIsModalOpen(false)}
            className="absolute top-[30px] right-6 mr-6 text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:mr-0 md:text-[25px]"
          />
          <div
            className={`mt-6 relative left-6 pr-6 mx-32 max-h-[560px] overflow-y-auto ${styles.scrollbarCustom}`}
          >
            {pets.map((pet) => (
              <SuggestionItems pet={pet} key={pet.petId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
