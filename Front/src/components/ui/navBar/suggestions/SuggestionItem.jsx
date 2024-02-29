import React from 'react';
import FollowButton from '../../FollowButton';

export default function SuggestionItem({ pet }) {
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
}
