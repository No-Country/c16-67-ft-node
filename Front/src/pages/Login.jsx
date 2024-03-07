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
        <div className="absolute flex justify-evenly w-full h-full md:px-20 xl:px-0">
          <div className="hidden flex-col justify-between h-[78%] lg:flex">
            <img src={logo} alt="isologo" className="w-[179px] h-[50px]" />
            <img
              src={catsLanding}
              alt="Cats"
              className=" w-[510px] aspect-[510/520] object-contain h-[520px]"
            />
          </div>
          <div className="flex flex-col justify-around items-start mr-10 my-36">
            <span>
              <p className="ml-[20px] text-[45px] text-primary-800">Paws to everyone!</p>
            </span>
            <div className="flex flex-col justify-around items-center h-[35%]">
              <p className="font-walter text-[30px] mt-10">Welcome to</p>
              <img src={logo} alt="isologo" className="w-[413px] h-[100px]" />
              <div className="flex flex-col mt-[20px]">
                <h3 className="mb-5 text-[#232220CC] text-[16px] font-semibold">By PetDevs</h3>
              </div>
            </div>
            <div className="flex flex-col justify-between h-[25%] items-start ml-[20px]">
              <p className="w-[560px] text-[22px]">
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
