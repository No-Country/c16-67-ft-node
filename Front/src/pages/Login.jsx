import { React, useState, useEffect } from 'react';
import LoginContent from '../components/authentication/LoginContent';
import logo from '../assets/images/isologo.svg';
import catsLanding from '../assets/images/catsLanding.png';
import walkFoots from '../assets/images/walkFoots.png';

export default function Login() {
  const [desktopView, setDesktopView] = useState(false);

  const handleResize = () => {
    setDesktopView(window.innerWidth > 768);
  };

  useEffect(() => {
    setDesktopView(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return desktopView ? (
    <>
      <main className="fixed flex pl-0 top-0 bottom-0 right-0 left-0 justify-start items-center bg-primary-50">
        <div className="relative">
          <img src={walkFoots} alt="Cats" className="w-[800px] opacity-10 animate-paws" />
          <img src={walkFoots} alt="Cats" className="w-[800px] opacity-10 animate-paws " />
        </div>
        <div className="absolute flex justify-between w-[90%] h-full">
          <div className="flex flex-col justify-between h-[78%] ml-20">
            <img src={logo} alt="isologo" className="w-[179px] h-[50px]" />
            <img src={catsLanding} alt="Cats" className=" w-[510px] h-[520px]" />
          </div>
          <div className="flex flex-col justify-around items-center mr-20 my-20 ">
            <div className="flex flex-col justify-around items-center h-[35%]">
              <span>
                <p className="text-[45px] text-primary-700">Paws to everyone!</p>
              </span>
              <p className="font-walter text-[30px] mt-14">Welcome to</p>
              <img src={logo} alt="isologo" className="w-[413px] h-[100px]" />
            </div>
            <div className="flex flex-col mt-[20px]">
              <h3 className="mb-5 text-[#232220CC] text-[16px] font-semibold">By PetDevs</h3>
            </div>
            <div className="flex flex-col justify-evenly h-[50%] items-center">
              <p className="w-[560px] text-[22px] text-center">
                The social media for pets, where they are the main characters.
              </p>
              <LoginContent />
            </div>
          </div>
        </div>
      </main>
    </>
  ) : (
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
