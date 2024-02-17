import React from 'react';
import logo from '../../public/assets/images/isologo.svg';

export default function HomeTab({ tabActive, setTabActive }) {
  return (
    <div>
      <img src={logo} className="w-full hidden md:block xl:hidden h-12" alt="logo" />
      <div className="flex h-12 md:h-16 md:text-xl fixed md:static w-full bg-white">
        <div
          className={`flex-grow basis-0 text-center h-full flex items-center justify-center ${tabActive === 'Feed' ? 'border-secondary-300 border-b-2' : 'text-gray-600 border-gray-300 border-b-2'}`}
          onClick={() => setTabActive('Feed')}
        >
          Feed
        </div>
        <div
          className={`flex-grow basis-0 text-center h-full flex items-center justify-center ${tabActive === 'Lost-Adption' ? 'border-secondary-300 border-b-2' : 'text-gray-600 border-gray-300 border-b-2'}`}
          onClick={() => setTabActive('Lost-Adption')}
        >
          Lost/In adoption
        </div>
      </div>
    </div>
  );
}
