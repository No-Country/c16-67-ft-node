import React from 'react';
import FollowButton from '../../FollowButton';
import { NavLink } from 'react-router-dom';

export default function SuggestionItem({ pet, setIsModalOpen }) {
  return (
    <NavLink
      className="flex justify-between w-full items-center"
      to={`/profile/${pet.petId}`}
      onClick={() => setIsModalOpen(false)}
    >
      <div className="flex py-4 gap-x-2">
        <img
          src={pet.image_url}
          alt="image of another pet"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p>{pet.name}</p>
          <p>@{pet.username}</p>
        </div>
      </div>
      <FollowButton />
    </NavLink>
  );
}
