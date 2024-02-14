import React from 'react';
import HomeTab from './../components/HomeTab';
import PetContainer from './../components/PetContainer';

export default function Home() {
  return (
    <>
      <HomeTab />
      <div className="fixed bg-slate-800 rounded-full text-white text-center mr-4 w-16 h-16 right-4 bottom-24 z-50">
        <span className="material-symbols-outlined text-2xl">filter_alt</span>
        <p className="text-sm">Filter</p>
      </div>
      <PetContainer />
    </>
  );
}
