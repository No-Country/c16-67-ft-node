import React, { useEffect, useState } from 'react';
import {
  createPetComments,
  deletePetCommentsById,
  getPetCommentsById
} from '../../../service/comments/commentsService';
import { FiX } from 'react-icons/fi';
import { BiTrash } from 'react-icons/bi';
import styles from './PetContainer.module.css';
import Spinner from '../../ui/Spinner';

export default function PetCommentModal({
  setIsModalOpen,
  postId,
  setComments,
  petId,
  petName,
  petUsername,
  profileImage
}) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentsModal, setCommentsModal] = useState('');
  const userId = JSON.parse(localStorage.getItem('userId'));

  const sendComment = () => {
    const body = {
      petId: petId,
      postId: postId,
      userId: userId,
      name: petName,
      username: petUsername,
      comment: commentsModal,
      image_url: profileImage
    };

    createPetComments(body).then(() => {
      setCommentsModal('');
      fetchComments();
    });
  };

  const deleteComment = (commentId) => {
    deletePetCommentsById(commentId).then(() => {
      fetchComments();
    });
  };

  const fetchComments = () => {
    setIsLoading(true);
    getPetCommentsById(postId)
      .then((res) => {
        setComments(res.data.data);
        setPets(res.data.data);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full bg-blackOpacity z-[1000]">
        <div
          className={` bg-white md:max-w-[700px] min-h-screen overflow-auto md:min-h-0 md:m-auto md:my-24 md:rounded-3xl relative animate-petModalOpen md:animate-appearOpen`}
        >
          <div className="mt-6 flex flex-col items-center gap-y-8">
            <div className="bg-gradient-to-r from-[#F06900] to-[#C31A02] w-44 h-1 rounded-full" />
            <h3 className="text-title-lg text-center font-bold">Growls</h3>
          </div>
          <FiX
            onClick={() => setIsModalOpen(false)}
            className="absolute top-[30px] right-6 text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:text-[25px]"
          />
          <div className="relative flex flex-col justify-between px-2 min-h-[calc(100dvh-80px)] md:min-h-[calc(70dvh-80px)]">
            <div
              className={`mt-6 relative mx-5 pr-6 max-h-[75dvh] md:max-h-[55dvh]  overflow-y-auto ${styles.scrollbarCustomLikes}`}
            >
              {pets.length === 0 ? (
                <div className="flex justify-center w-full items-center h-[100px]">
                  <p className="text-title-md font-semibold">0 growls to display</p>
                </div>
              ) : (
                Array.isArray(pets) &&
                pets.map((pet) => (
                  <div key={pet.commentId} className="relative">
                    <div className="flex w-full">
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
                    {userId === pet.userId && (
                      <BiTrash
                        className="absolute right-0 top-4 text-[20px] md:text-[25px] text-error-800 cursor-pointer hover:bg-[#FBF0E7] hover:rounded-full hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-125"
                        onClick={() => deleteComment(pet.commentId, pet.userId)}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
            <div
              className="relative m-5 mt-auto"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendComment();
                }
              }}
            >
              <div className="w-full p-2 px-4 rounded-3xl text-body-lg bg-[#EAEAEA]">
                <input
                  placeholder="Add a growl.."
                  value={commentsModal}
                  className="min-w-[200px] w-[83%] text-body-lg outline-none bg-transparent placeholder:text-[#00000090] placeholder:font-semibold"
                  onChange={(e) => setCommentsModal(e.target.value)}
                />
              </div>
              <button
                className="absolute right-4 top-2 text-body-lg text-secondary-700 font-bold hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  sendComment();
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
