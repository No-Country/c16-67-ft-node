import likeIcon from '../../assets/images/like.png';
import commentIcon from '../../assets/images/comment.png';
import { FiCheckCircle } from 'react-icons/fi';
import addPet from '../../assets/images/addPet.svg';

export default function PetCard({
  postImage,
  description,
  petImg,
  isSelected,
  petName,
  profileImage,
  petCardProfile,
  petCardProfileDefault,
  address,
  onClick
}) {
  return petCardProfile ? (
    <div
      className={`w-[151px] h-[188px] border rounded-[14px] cursor-pointer shadow-md ${isSelected ? 'border-[#182E15] border-[2px]' : 'border-gray-300'}`}
      onClick={onClick}
    >
      <img src={petImg} className="w-[150px] h-[140px] rounded-t-[14px] object-cover" />
      <div className="flex justify-between items-center h-[40px] mx-4">
        <p className="text-center text-[16px] font-bold">{petName}</p>
        {isSelected ? <FiCheckCircle className="text-[20px]" /> : null}
      </div>
    </div>
  ) : petCardProfileDefault ? (
    <div
      className={`w-[151px] h-[188px] mb-8 border rounded-[14px] cursor-pointer shadow-md `}
      onClick={onClick}
    >
      <img src={addPet} className="w-full h-full rounded-t-[14px] object-cover" />
    </div>
  ) : (
    <div className="mb-4 md:grid md:grid-cols-12 md:h-80 md:shadow-md md:rounded-2xl auto-rows-fr max-w-[640px] mx-auto">
      <div className="flex px-4 gap-x-3 items-center md:h-fit md:mt-4 md:col-[7/13] md:relative">
        <img className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full" src={profileImage} />
        <div className="flex-grow">
          <div>{petName}</div>
          <div className="text-gray-500">@{petName}</div>
          <div className="text-black md:absolute md:left-4 bottom-[-96px]">{description}</div>
        </div>
        <button className="text-white bg-secondary-300 h-fit p-2 rounded-md">Follow</button>
      </div>
      <div className="px-4 mb-2 flex gap-x-2 md:col-[7/13] md:row-[3/4] h-fit">
        <span className="material-symbols-outlined">location_on</span>
        <span>{address}</span>
      </div>
      <img
        src={postImage}
        className="h-80 object-cover w-full md:rounded-2xl 
        md:row-start-1 md:col-[1/7] md:row-[1/7]"
        alt=""
      />
      <div className="flex gap-x-6 left-8 ml-5 mt-2 col-[7/13] h-fit md:row-[5/6]">
        <div className="flex gap-x-1">
          <img src={likeIcon} alt="like icon" />
          <p>3</p>
        </div>
        <div className="flex gap-x-1">
          <img src={commentIcon} alt="comment icon" />
          <p>4</p>
        </div>
      </div>
      <div className="hidden md:block ml-5 col-[7/13] h-fit md:row-[6/7] text-gray-500">
        Add a comment...
      </div>
    </div>
  );
}
