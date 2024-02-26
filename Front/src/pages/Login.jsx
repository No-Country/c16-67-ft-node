import { React } from 'react';
import LoginContent from '../components/login/LoginContent';
import logo from '../assets/images/isologo.svg';
import catsLanding from '../assets/images/catsLanding.png';

export default function Login() {
  return (
    <>
      <main className="fixed flex flex-col pl-0 py-12 top-0 bottom-0 right-0 left-0 justify-start items-center bg-[#F8F0EA]">
        <img src={logo} alt="isologo" className="w-[179px] h-[50px]" />
        <div className="flex flex-col mt-[20px]">
          <h3 className="mb-5 text-[#232220CC] text-[16px] font-semibold">By PetDevs</h3>
        </div>
        <img src={catsLanding} alt="Cats" className="w-[337px] h-[376px]" />
        <p className="w-[273px] text-[15px]">
          The social media for pets, where they are the main characters.
        </p>
        <div className="flex flex-col h-[100px]">
          <p className="hidden font-walter text-[30px] text-[#000] text-center md:block">
            Welcome to
          </p>
          <img src={logo} alt="isologo" className="hidden" />
        </div>
        <LoginContent />
      </main>
    </>
  );
}
