import { useEffect, useState } from 'react';
import axios from 'axios';
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
    <div className="mb-4">
      <div className="flex p-4 gap-x-3 items-center ">
        <img className="w-12 h-12 object-cover rounded-full" src={pet.image_url} />
        <div className="flex-grow">
          <div>{pet.name}</div>
          <div className="text-gray-500">@{pet.name}</div>
        </div>
        <button className="text-white bg-gray-500 h-fit p-2 rounded-md">Follow</button>
      </div>
      <div className="relative">
        <img src={postImage} className="h-80 object-cover w-full" alt="" />
        <div className="absolute bottom-3 flex gap-x-3 left-8">
          <div className="flex gap-x-3">
            <span className="material-symbols-outlined">pet_supplies</span>
            <p>3</p>
          </div>
          <div className="flex gap-x-3">
            <span className="material-symbols-outlined">chat_bubble</span>
            <p>4</p>
          </div>
        </div>
      </div>
      <div className="text-gray-600 ">{description}</div>
    </div>
  );
}
