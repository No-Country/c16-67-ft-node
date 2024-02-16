export default function PetCard({ postImage, description, petId, postId, petName, profileImage }) {
  return (
    <div className="mb-4">
      <div className="flex p-4 gap-x-3 items-center ">
        <img className="w-12 h-12 object-cover rounded-full" src={profileImage} />
        <div className="flex-grow">
          <div>{petName}</div>
          <div className="text-gray-500">@{petName}</div>
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
