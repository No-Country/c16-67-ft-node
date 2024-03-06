import { NavLink } from 'react-router-dom';
import FollowButton from '../ui/FollowButton';

export const PetProfileCard = ({ name, image, altText, petId, username }) => {
  return (
    <section className="relative mb-4 md:shadow-md md:rounded-2xl w-full hover:bg-primary-50 hover:transition-all hover:duration-[0.4s] hover:ease-in-out md:border">
      <NavLink
        className="flex justify-between px-4 gap-x-3 items-center md:h-fit md:col-[7/13] md:relative md:self-center"
        to={`/profile/${petId}`}
      >
        <div className="flex items-center gap-x-3">
          <img
            className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full p-2 cursor-pointer"
            src={image}
            alt={altText}
          />
          <div className="flex flex-col">
            <span>{name}</span>
            <span>@{username}</span>
          </div>
        </div>
        <div className="">
          <FollowButton />
        </div>
      </NavLink>
    </section>
  );
};
