import React, { useState } from 'react';
import Privacity from '../settings/Privacity/Privacity';
import Change from '../settings/Changeaccount/change';
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
      default:
        return null;
    }
  };

  return (
    <div className="flex max-md:flex-col bg-white h-screen   ml-[-20px] ">
      {/* Logo en la vista de escritorio */}
      <div className="hidden md:block absolute top-5 right-[-70px] ">
        <img src={isologo} alt="icono" />
      </div>

      {/* Contenedores principales */}
      <div className="border-stone-400  px-8 mt-40 overflow-y-auto">
        <p className="text-3xl leading-9 mb-8">Account Center</p>

        {/* Botones de Account */}
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

        {/* Otros botones de Account */}
        <button className="hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full text-left text-amber-800">
          Delete your account
        </button>
        <button className="hover:bg-[#FBF0E7] text-lg font-medium px-6 py-3 w-full text-left text-amber-800">
          Pause your account
        </button>

        {/* Contenedor de Help */}
        <div className="flex flex-col mt-10 max-md:w-full max-md:max-w-full">
          <p className="text-3xl leading-9 mb-8">Help</p>

          {/* Botones de Help */}
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
      

      {/* Contenedor de Contenido */}
      <div className="flex flex-col w-[700px] mt-[8rem] px-8 gap-5 max-md:w-full max-md:max-w-full">
        {renderContent()}
      </div>
    </div>
  );
}

