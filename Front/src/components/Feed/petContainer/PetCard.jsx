import likeIcon from '../../../assets/images/paw.svg';
import commentIcon from '../../../assets/images/comment.svg';
import saveIcon from '../../../assets/images/save.svg';
import saveIconFill from '../../../assets/images/saveFill.svg';
import FollowButton from '../../ui/FollowButton';
import { deleteSaved, postSave } from '../../../service/saves/saveService';
import { useState } from 'react';

export default function PetCard({
  postImage,
  description,
  petName,
  profileImage,
  address,
  postId,
  saved,
  fetchSaved,
  tabActive,
  type
}) {
  const [seeMore, setSeeMore] = useState(false);

  const savePost = () => {
    const { petId } = JSON.parse(localStorage.getItem('pet'));
    const { userId } = JSON.parse(localStorage.getItem('userId'));

    const body = {
      petId: petId,
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

  return (
    <div className="mb-4 md:grid md:grid-cols-12 md:h-[360px] md:shadow-md md:rounded-2xl auto-rows-fr max-w-[768px] md:border mx-auto">
      <div className="flex px-4 gap-x-3 items-center md:h-fit md:col-[7/13] md:relative md:self-center">
        <img
          className={`w-12 h-12 object-cover rounded-full ${seeMore && 'self-start mt-[10px]'}`}
          src={profileImage}
        />
        <div className="flex-grow">
          <div>{petName}</div>
          <div className="text-gray-500">@{petName}</div>
          <div
            className={`text-black md:hidden flex max-w-[calc(100vw-196px)] ${seeMore ? 'flex-col' : 'justify-between'}`}
          >
            <p className={`${!seeMore && 'truncate'}`}>{description}</p>
            {!seeMore && (
              <p
                className="text-black cursor-pointer font-bold md:hidden  min-w-5"
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
      </div>
      <div className="px-4 my-3 flex gap-x-2 md:col-[7/13] md:row-[2/3] h-full md:my-0 md:mb-4 items-center self-center md:border-b md:border-primary-500">
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
        {tabActive === 'Lost-Adption' && type === 'Lost' && (
          <p className="absolute top-4 right-4 h-6 w-14 grid place-items-center rounded-sm bg-secondary-700 text-white font-bold uppercase">
            {type}
          </p>
        )}
        {tabActive === 'Lost-Adption' && type === 'Adopcion' && (
          <p className="absolute top-4 right-4 h-6 px-2 grid place-items-center rounded-sm bg-secondary-100 text-primary-700 font-bold uppercase">
            In adoption
          </p>
        )}
      </div>
      <div className="flex justify-between ml-5 mt-2 col-[7/13] h-fit md:row-[5/6]">
        <div className="flex gap-x-6 ">
          <div className="flex gap-x-1">
            <img src={likeIcon} alt="like icon" />
            <p>3</p>
          </div>
          <div className="flex gap-x-1">
            <img src={commentIcon} alt="comment icon" />
            <p>4</p>
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
      <div className="hidden md:block ml-5 col-[7/13] h-fit md:row-[6/7] text-gray-500">
        Add a comment...
      </div>
    </div>
  );
}
