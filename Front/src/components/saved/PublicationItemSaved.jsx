import savedIconFill from '../../assets/images/saveFill.svg';
import { deleteSaved } from '../../service/saves/saveService';

export default function PublicationItemSaved({ item, fetchPublications }) {
  const handleClick = () => {
    deleteSaved(item.saveId)
      .then(async () => {
        await fetchPublications();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col border shadow-md rounded-md">
      <div className="flex items-center gap-x-4 p-2">
        <img
          src={item.image_url_pet}
          alt={`${item.name_pet} image`}
          className="h-12 w-12 object-cover rounded-full"
        />
        <p className="flex-grow">{item.name_pet}</p>
        <img
          src={savedIconFill}
          alt="saved icon"
          className="h-6 w-6 cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="h-fit">
        <img
          src={item.image_url_post}
          alt={`post image`}
          className="object-cover aspect-square w-full rounded-b-md"
        />
      </div>
    </div>
  );
}
