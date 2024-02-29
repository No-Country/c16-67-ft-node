import React, { useState } from 'react';
import Privacity from '../settings/Privacity/Privacity';
import Change from '../settings/Changeaccount/change'; // Asegúrate de tener el nombre correcto del componente Change
import isologo from '../../assets/images/isologo.svg';
import arrow from '../../assets/images/arrow.svg';

export default function ConfiguracionPage() {
  const [currentPage, setCurrentPage] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'privacy':
        return <Privacity />;
      case 'change':
        return <Change />;
      // Puedes agregar más casos para otras páginas si es necesario
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-start my-8 h-10 p-4 ml-auto hidden md:block">
        <img src={isologo} alt="icono" />
      </div>
      <div className="flex max-md:flex-col bg-white h-screen border-stone-400 ml-[-195px]">
        <div className=" border-stone-400 border-r-2  px-8 mt-10 ">
          <p className="text-3xl leading-9 mb-8">Account Center</p>
          <button
            onClick={() => handleButtonClick('privacy')}
            className="hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full flex items-center justify-between"
          >
            <span>Privacy</span>
            <span className="ml-2">
              <img src={arrow} alt="icono" className="w-4 h-4" />
            </span>
          </button>

          <button
            onClick={() => handleButtonClick('change')}
            className="hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full flex items-center justify-between"
          >
            <span>Change Google Account</span>
            <span className="ml-2">
              <img src={arrow} alt="icono" className="w-4 h-4" />
            </span>
          </button>

          <button
            className="hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full text-left text-amber-800"
          >
            Delete your account
          </button>

          <button
            className="hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full text-left text-amber-800"
          >
            Pause your account
          </button>

          <div className="flex flex-col mt-10 max-md:w-full max-md:max-w-full">
            <p className="text-3xl leading-9 mb-8">Help</p>
            <button
              className="hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full flex items-center justify-between"
            >
              <span>Report an issue</span>
              <span className="ml-2">
                <img src={arrow} alt="icono" className="w-4 h-4" />
              </span>
            </button>

            <button
              className="mt-2 hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full flex items-center justify-between"
            >
              <span>How to use app</span>
              <span className="ml-2">
                <img src={arrow} alt="icono" className="w-4 h-4" />
              </span>
            </button>

            <button
              className="mt-2 hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full flex items-center justify-between"
            >
              <span>Contact center</span>
              <span className="ml-2">
                <img src={arrow} alt="icono" className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col w-[500px] px-8 gap-5 max-md:w-full max-md:max-w-full">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
