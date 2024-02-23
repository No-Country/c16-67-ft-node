import likeIcon from '../../assets/images/paw.svg';
import commentIcon from '../../assets/images/comment.svg';
import saveIcon from '../../assets/images/save.svg';
import FollowButton from '../FollowButton';

export default function PetCard({ postImage, description, petName, profileImage, address }) {
  return (
    <div className="mb-4 md:grid md:grid-cols-12 md:h-[360px] md:shadow-md md:rounded-2xl auto-rows-fr max-w-[768px] md:border mx-auto">
      <div className="flex px-4 gap-x-3 items-center md:h-fit md:col-[7/13] md:relative md:self-center">
        <img className="w-12 h-12 object-cover rounded-full" src={profileImage} />
        <div className="flex-grow">
          <div>{petName}</div>
          <div className="text-gray-500">@{petName}</div>
          <div className="text-black md:hidden">{description}</div>
        </div>
        <FollowButton />
      </div>
      <div className="px-4 my-3 flex gap-x-2 md:col-[7/13] md:row-[2/3] h-fit self-center md:border-b md:border-primary-500">
        <span className="material-symbols-outlined">location_on</span>
        <span>{address}</span>
      </div>
      <div className="text-black hidden md:block md:col-[7/13] md:row-[3/4] ml-4">
        {description}
      </div>
      <img
        src={postImage}
        className="md:h-[360px] md:w-full object-cover md:rounded-2xl
        md:row-start-1 md:col-[1/7] md:row-[1/7]"
        alt=""
      />
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
          <img src={saveIcon} alt="like icon" className="mr-5" />
        </div>
      </div>
      <div className="hidden md:block ml-5 col-[7/13] h-fit md:row-[6/7] text-gray-500">
        Add a comment...
      </div>
    </div>
  );
}
