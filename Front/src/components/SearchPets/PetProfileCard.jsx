import FollowButton from '../ui/FollowButton';

export const PetProfileCard = ({ name, image, altText }) => {
  return (
    <section className="mb-4 md:shadow-md md:rounded-2xl max-w-[768px] md:border mx-auto">
      <div className="flex justify-between px-4 gap-x-3 items-center md:h-fit md:col-[7/13] md:relative md:self-center">
        <div className="flex items-center gap-x-3">
          <img className="w-24 h-24 object-cover rounded-full p-2" src={image} alt={altText} />
          <div className="flex flex-col">
            <span>{name}</span>
            <span>@{name}</span>
          </div>
        </div>
        <FollowButton />
      </div>
    </section>
  );
};
