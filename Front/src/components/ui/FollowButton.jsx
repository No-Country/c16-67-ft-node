export default function FollowButton() {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
      }}
      className="bg-white border border-secondary-800 h-10 min-w-20 rounded-md shadow-md font-semibold hover:bg-secondary-50 hover:transition-all hover:duration-[0.4s] hover:ease-in-out"
    >
      Follow
    </button>
  );
}
