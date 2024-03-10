import React, { useEffect, useState } from 'react';
import FollowButton from '../../ui/FollowButton';
import { FiX } from 'react-icons/fi';
import styles from './PetContainer.module.css';
import Spinner from '../../ui/Spinner';
import { getPetReactionsById } from '../../../service/reactions/reactionsService';

export default function PetLikesModal({ setIsModalOpen, postId }) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPetReactionsById(postId)
      .then((response) => {
        console.log(response);
        setPets(response.data.data);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 md:px-10 w-screen bg-blackOpacity z-[1000]">
        <div
          className={` bg-white m-auto md:max-w-[700px] h-screen md:h-[calc(100dvh-192px)] overflow-auto md:my-24 md:rounded-3xl relative animate-petModalOpen md:animate-appearOpen`}
        >
          <div className="mt-6 flex flex-col items-center gap-y-8">
            <div className="bg-gradient-to-r from-[#F06900] to-[#C31A02] w-44 h-1 rounded-full" />
            <h3 className="text-title-lg text-center font-bold">Paws</h3>
          </div>
          <FiX
            onClick={() => setIsModalOpen(false)}
            className="absolute top-[30px] right-6 text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:text-[25px]"
          />
          <div
            className={`mt-6 relative mx-5 pr-6 md:mx-20 max-h-[60dvh] md:max-h-[560px] overflow-y-auto ${styles.scrollbarCustomLikes}`}
          >
            {pets.length === 0 ? (
              <div className="flex justify-center w-full items-center h-[100px]">
                <p className="text-title-md font-semibold">0 paws to display</p>
              </div>
            ) : (
              pets.map((pet) => (
                <div key={pet.petId} className="flex justify-between w-full items-center">
                  <div className="flex items-center py-4 gap-x-6">
                    <img
                      src={pet['pet.image_url']}
                      alt="image of another pet"
                      className="w-14 h-14 md:w-14 md:h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-title-sm md:text-title-lg">{pet['pet.name']}</p>
                      <p className="text-body-md md:text-title-sm text-[#232220B2]">
                        @{pet['pet.username']}
                      </p>
                    </div>
                  </div>
                  <FollowButton />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
