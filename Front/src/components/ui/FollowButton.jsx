import { useState } from 'react';

export default function FollowButton() {
  const [follow, setFollow] = useState(false);
  return follow ? (
    <button
      onClick={(e) => {
        e.preventDefault();
        setFollow(false);
      }}
      className="bg-secondary-800 border border-secondary-800 h-9 min-w-20 rounded-md shadow-md font-semibold text-white md:min-w-24 md:h-10 hover:bg-secondary-700 transition-all hover:duration-[0.4s] hover:ease-in-out"
    >
      Following
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.preventDefault();
        setFollow(true);
      }}
      className="bg-white border border-secondary-800 h-9 min-w-20 rounded-md shadow-md font-semibold md:min-w-24 md:h-10 hover:bg-secondary-50 transition-all hover:duration-[0.4s] hover:ease-in-out"
    >
      Follow
    </button>
  );
}
