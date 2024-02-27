import FollowButton from '../ui/FollowButton';

export const PetProfileCard = ({ name, image, altText, onClick }) => {
  return (
    <section
      className="relative mb-4 md:shadow-md md:rounded-2xl w-full hover:bg-primary-50 hover:transition-all hover:duration-[0.4s] hover:ease-in-out md:border"
      onClick={onClick}
    >
      <div className="flex justify-between px-4 gap-x-3 items-center md:h-fit md:col-[7/13]  md:relative md:self-center">
        <div className="flex items-center gap-x-3">
          <img
            className="w-24 h-24 object-cover rounded-full p-2 cursor-pointer"
            src={image}
            alt={altText}
          />
          <div className="flex flex-col">
            <span>{name}</span>
            <span>@{name}</span>
          </div>
        </div>
      </div>
      <div className="absolute flex justify-end w-[96%] top-7">
        <FollowButton />
      </div>
    </section>
  );
};
