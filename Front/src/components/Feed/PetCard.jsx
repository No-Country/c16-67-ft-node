import { useEffect, useState } from 'react';
import axios from 'axios';
import likeIcon from '../../../public/assets/images/like.png';
import commentIcon from '../../../public/assets/images/comment.png';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export default function PetCard({ postImage, description, petId, postId }) {
  const [pet, setPet] = useState({
    name: '',
    image_url: ''
  });

  useEffect(() => {
    axios
      .get(`${API_URL_BASE}/api/v1/pet/${petId}`)
      .then((res) => setPet({ name: res.data.name, image_url: res.data.image_url }));
  }, []);

  return (
    <div className="mb-4 md:grid md:grid-cols-12 md:h-80 md:shadow-md md:rounded-2xl auto-rows-fr max-w-[640px] mx-auto">
      <div className="flex px-4 gap-x-3 items-center md:h-fit md:mt-4 md:col-[7/13] md:relative">
        <img className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full" src={pet.image_url} />
        <div className="flex-grow">
          <div>{pet.name}</div>
          <div className="text-gray-500">@{pet.name}</div>
          <div className="text-black md:absolute md:left-4 bottom-[-96px]">{description}</div>
        </div>
        <button className="text-white bg-secondary-300 h-fit p-2 rounded-md">Follow</button>
      </div>
      <div className="px-4 mb-2 flex gap-x-2 md:col-[7/13] md:row-[3/4] h-fit">
        <span className="material-symbols-outlined">location_on</span>
        Córdoba, Córdoba, Argentina
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
