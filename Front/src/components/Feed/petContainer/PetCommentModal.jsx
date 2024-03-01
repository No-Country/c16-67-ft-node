import React, { useEffect, useState } from 'react';
import { getPetCommentsById } from '../../../service/comments/commentsService';
import { FiX } from 'react-icons/fi';
import styles from './PetContainer.module.css';
import Spinner from '../../ui/Spinner';

export default function PetCommentModal({ setIsModalOpen, postId, setComments }) {
  const [pets, setPets] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPetCommentsById(postId)
      .then((res) => {
        setComments(res.data.data);
        setPets(res.data.data);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full bg-blackOpacity z-[1000]">
        <div
          className={` bg-white max-w-[700px] overflow-auto my-24 md:m-auto md:my-24 rounded-3xl relative mx-3 `}
        >
          <div className="mt-6 flex flex-col items-center gap-y-8">
            <div className="bg-gradient-to-r from-[#F06900] to-[#C31A02] w-44 h-1 rounded-full" />
            <h3 className="text-title-lg text-center font-bold">Growls</h3>
          </div>
          <FiX
            onClick={() => setIsModalOpen(false)}
            className="absolute top-[30px] right-6 text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:text-[25px]"
          />
          <div className="relative flex flex-col justify-between px-2">
            <div
              className={`mt-6 relative mx-5 pr-6 max-h-[50vh] md:max-h-[560px] overflow-y-auto ${styles.scrollbarCustomLikes}`}
            >
              {pets.length === 0 ? (
                <div className="flex justify-center w-full items-center h-[100px]">
                  <p className="text-title-md font-semibold">0 comments available</p>
                </div>
              ) : (
                Array.isArray(pets) &&
                pets.map((pet) => (
                  <div key={pet.commentId} className="flex w-full">
                    <img
                      src={pet['pet.image_url']}
                      alt={`image of ${pet['pet.name']}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col pl-5">
                      <div className="flex items-center">
                        <p className="text-title-md mr-2 font-semibold">{pet['pet.name']}</p>
                        <p className=" text-title-md text-[#9A9A9A]">@{pet['pet.username']}</p>
                      </div>
                      <div className="pb-4 pt-2">
                        <div>
                          <p>{pet.comment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="relative m-5 ">
              <div className="w-full p-2 rounded-3xl text-body-lg bg-[#FBF0E7]">
                <input
                  placeholder="Add a growl.."
                  className="min-w-[200px] w-[83%] text-body-lg outline-none bg-transparent"
                />
              </div>
              <button
                className="absolute right-4 top-2 text-body-lg text-secondary-800 font-bold hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
