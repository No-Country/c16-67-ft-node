import logo from '../assets/images/isologo.svg';

export default function HomeTab() {
  return (
    <div className="">
      <img src={logo} className="w-full hidden md:block xl:hidden h-12" alt="logo" />
      <div className="flex h-12 md:h-16 md:text-xl fixed md:static w-full bg-white">
        <div className="flex-grow basis-0 text-center h-full flex items-center justify-center border-secondary-300 border-b-2">
          Feed
        </div>
        <div className="flex-grow basis-0 text-center h-full flex items-center justify-center text-gray-600 border-gray-300 border-b-2">
          Lost/In adoption
        </div>
      </div>
    </div>
  );
}
