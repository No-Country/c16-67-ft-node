import React from 'react';
import HomeTab from './../components/HomeTab';
import PetContainer from './../components/PetContainer';

export default function Home() {
  return (
    <>
      <HomeTab />
      <div className="flex justify-end">
        <div className="w-fit text-center mr-4">
          <span className="material-symbols-outlined text-5xl text-slate-700">filter_alt</span>
          <p>Filter</p>
        </div>
      </div>
      <PetContainer />
    </>
  );
}
