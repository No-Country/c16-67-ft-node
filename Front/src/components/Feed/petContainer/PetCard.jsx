import likeIcon from '../../../assets/images/likeEmpty.svg';
import likeIconFill from '../../../assets/images/likeFilled.svg';
import commentIcon from '../../../assets/images/comment.svg';
import saveIcon from '../../../assets/images/save.svg';
import saveIconFill from '../../../assets/images/saveFill.svg';
import FollowButton from '../../ui/FollowButton';
import PetCommentModal from './PetCommentModal';
import PetLikesModal from './PetLikesModal';
import { deleteSaved, postSave } from '../../../service/saves/saveService';
import { useState, useEffect } from 'react';
import { createPetComments, getPetCommentsById } from '../../../service/comments/commentsService';
import Spinner from '../../ui/Spinner';
import { useModalContext } from '../../../context/modalContext';

import {
  deletePetReactionsById,
  getPetReactionsById,
  sendPetReactions
} from '../../../service/reactions/reactionsService';
import { deletePetPublicationsById } from '../../../service/publications/publicationsService';
import DropDownMenu from '../../ui/DropdownMenu/DropDownMenu';

export default function PetCard({
  postImage,
  description,
  petName,
  profileImage,
  address,
  postId,
  userIdDelete,
  saved,
  petUserName,
  fetchSaved,
  type
}) {
  const { openModal, closeModal } = useModalContext();
  const [seeMore, setSeeMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCommentOpen, setIsModalCommentOpen] = useState(false);
  const [reactionId, setReactionId] = useState(undefined);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const userId = JSON.parse(localStorage.getItem('userId'));
  const pet = JSON.parse(localStorage.getItem('pet'));

  const savePost = () => {
    const body = {
      petId: pet.petId,
      postId: postId,
      userId: userId,
      name_pet: petName,
      image_url_pet: profileImage,
      image_url_post: postImage
    };

    postSave(body).then(() => {
      fetchSaved();
    });
  };

  const deleteSave = () => {
    deleteSaved(saved.saveId).then(() => {
      fetchSaved();
    });
  };

  const sendComment = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    const body = {
      petId: pet.petId,
      postId: postId,
      userId: userId,
      name: petName,
      username: petUserName,
      comment: comment,
      image_url: profileImage
    };

    setIsLoading(true);
    createPetComments(body).then(() => {
      setIsLoading(false);
      if (comments === '')
        openModal({
          description: 'An error has occurred',
          chooseModal: false,
          error: true
        });
      openModal({
        description: 'Comment sended successfully',
        chooseModal: false
      });
      setComment('');
      fetchData();
    });
  };

  const sendReactions = () => {
    if (like) {
      deletePetReactionsById(reactionId).then(() => {
        setLike(false);
        fetchData();
      });
    } else {
      const body = {
        petId: pet.petId,
        postId: postId,
        userId: userId,
        name: petName,
        username: pet.username,
        image_url: profileImage
      };
      sendPetReactions(body).then(() => {
        setLike(true);
        fetchData();
      });
    }
  };

  const deletePublication = () => {
    openModal({
      title: 'Delete publication',
      description: (
        <div className="inline md:flex md:flex-row items-center">
          <p className="inline text-[16px] text-[#2D3748] mr-1">Are you sure? </p>
          <p className="inline text-[16px] text-error-800">
            You can’t undo this action afterwards.
          </p>
        </div>
      ),
      confirmBtn: 'Delete',
      denyBtn: 'Cancel',
      onClick: () => {
        setIsLoading(true);
        deletePetPublicationsById(postId).then(() => {
          setIsLoading(false);
          setIsVisible(false);
          closeModal();
        });
      },
      chooseModal: true
    });
  };

  const fetchData = () => {
    setIsLoading(true);
    getPetCommentsById(postId)
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((e) => console.error(e));
    getPetReactionsById(postId)
      .then((response) => {
        const reactionRes = response.data.data.find((reaction) => reaction.petId === pet.petId);
        if (reactionRes !== undefined) {
          setReactionId(reactionRes.reactionId);
          setLike(true);
        }
        setReactions(response.data.data);
      })
      .catch((e) => console.error(e));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {isModalOpen && <PetLikesModal setIsModalOpen={setIsModalOpen} postId={postId} />}
      {isModalCommentOpen && (
        <PetCommentModal
          setIsModalOpen={setIsModalCommentOpen}
          postId={postId}
          setComments={setComments}
          petId={pet.petId}
          petName={petName}
          petUserName={petUserName}
          profileImage={profileImage}
        />
      )}
      {isVisible && (
        <div className="grid place-items-center md:px-4">
          <div className="mb-4 md:grid md:grid-cols-12 md:h-[360px] md:shadow-md md:rounded-2xl auto-rows-fr max-w-[768px] md:border mx-auto w-full">
            <div className="flex px-4 gap-x-3 items-center md:h-fit md:col-[7/13] md:relative md:self-center">
              <img
                className={`w-12 h-12 object-cover rounded-full ${seeMore && 'self-start mt-[10px]'}`}
                src={profileImage}
              />
              <div className="flex-grow">
                <div>{petName}</div>
                <div className="text-gray-500">@{petUserName}</div>
                <div
                  className={`text-black md:hidden flex max-w-[calc(100vw-196px)] ${seeMore ? 'flex-col' : 'justify-between'}`}
                >
                  <p className={`${!seeMore && 'truncate'}`}>{description}</p>
                  {!seeMore && (
                    <p
                      className="text-black cursor-pointer font-bold md:hidden min-w-5"
                      onClick={() => setSeeMore(true)}
                    >
                      See
                    </p>
                  )}
                  {seeMore && (
                    <p
                      className="text-black cursor-pointer mt-2 font-bold md:hidden"
                      onClick={() => setSeeMore(false)}
                    >
                      Hide
                    </p>
                  )}
                </div>
              </div>
              <FollowButton />
              <DropDownMenu deletePublication={deletePublication} userIdDelete={userIdDelete} />
            </div>
            <div className="px-4 my-3 flex gap-x-2 md:col-[7/13] md:row-[2/3] h-full md:my-0 md:mb-4 items-center self-center md:border-b md:border-[#D7640B]">
              <span className="material-symbols-outlined">location_on</span>
              <p>{address}</p>
            </div>
            <div className="text-black hidden md:block md:col-[7/13] md:row-[3/5] ml-4 max-h-24 overflow-hidden">
              {description}
            </div>
            <div className="md:row-start-1 md:col-[1/7] md:row-[1/7] relative">
              <img
                src={postImage}
                className="md:h-[360px] w-full aspect-square object-cover md:rounded-s-2xl"
                alt=""
              />
              {type === 'Lost' && (
                <p className="absolute top-4 right-4 h-6 w-14 grid place-items-center rounded-sm bg-secondary-700 text-white font-bold uppercase">
                  {type}
                </p>
              )}
              {type === 'Adoption' && (
                <p className="absolute top-4 right-4 h-6 px-2 grid place-items-center rounded-sm bg-secondary-100 text-primary-700 font-bold uppercase">
                  In adoption
                </p>
              )}
            </div>
            <div className="flex justify-between ml-5 mt-2 col-[7/13] h-fit md:row-[5/6]">
              <div className="flex gap-x-6 ">
                <div className="flex items-center gap-x-2">
                  {like ? (
                    <img
                      src={likeIconFill}
                      alt="like-icon"
                      className="cursor-pointer"
                      onClick={() => sendReactions()}
                    />
                  ) : (
                    <img
                      src={likeIcon}
                      alt="like-icon"
                      className="cursor-pointer"
                      onClick={() => sendReactions()}
                    />
                  )}
                  <p
                    className="text-[14px] cursor-pointer hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-110"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {reactions.length === 1
                      ? reactions.length + ' Paw'
                      : reactions.length + ' Paws'}
                  </p>
                </div>
                <div
                  className="flex items-center cursor-pointer gap-x-1 hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-110"
                  onClick={() => setIsModalCommentOpen(true)}
                >
                  <img src={commentIcon} alt="comment-icon" />
                  <p>
                    {comments.length === 1
                      ? comments.length + ' Growl'
                      : comments.length + ' Growls'}
                  </p>
                </div>
              </div>
              <div>
                {saved === undefined || saved?.status === false ? (
                  <>
                    <img
                      src={saveIcon}
                      alt="like icon"
                      className="mr-5 cursor-pointer"
                      onClick={savePost}
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={saveIconFill}
                      alt="like icon"
                      className="mr-5 cursor-pointer"
                      onClick={deleteSave}
                    />
                  </>
                )}
              </div>
            </div>
            <div
              className="hidden md:block relative ml-5 col-[7/13] h-fit md:row-[6/7] mr-5"
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
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-[275px] text-body-lg outline-none bg-transparent  placeholder:text-[#00000090] placeholder:font-semibold"
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
      )}
    </>
  );
}
