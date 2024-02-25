import axios from 'axios';
import logo from '../assets/images/isologo.svg';
import { useEffect, useState } from 'react';
import FollowButton from './FollowButton';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

const Item = ({ pet }) => {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex py-4 gap-x-2">
        <img
          src={pet.image_url}
          alt="image of another pet"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p>{pet.name}</p>
          <p>@{pet.name}</p>
        </div>
      </div>
      <FollowButton />
    </div>
  );
};

export default function Suggestions() {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL_BASE}/api/v1/pet/suggestion/${userId}?limit=5`)
      .then((res) => setPets(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="hidden xl:block xl:p-4 xl:flex-grow xl:basis-0">
      <img src={logo} className="w-full h-12" alt="logo" />
      <div className="flex mt-6 gap-x-1 justify-between">
        <p>Suggestions for you</p>
        <p className="font-bold">See all</p>
      </div>
      {
        <>
          {pets.map((pet) => (
            <Item key={pet.petId} pet={pet} />
          ))}
        </>
      }
    </div>
  );
}
