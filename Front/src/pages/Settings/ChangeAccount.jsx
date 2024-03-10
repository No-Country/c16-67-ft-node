import arrow from '../../assets/images/arrow.svg';
import React, { useState, useEffect } from 'react';

//  componente Change
const ChangeAccount = ({ onCancelClick }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 767;

  return (
    <div className="max-w-[767px] w-full bg-white p-8 mx-auto">
      <style>
        {`
          @media (max-width: 767px) {
            .cancel-button {
              ${isMobile ? 'display: none;' : ''}
            }
          }
          .form-button {
            background-color: #1E8357;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            display: inline-block;
          }
        `}
      </style>

      <div className="max-w-[767px] w-full mx-auto">
        <p className="text-3xl text-headline-small mb-10 flex items-center">
          <span className="hidden md:flex items-center">
            <span className="mr-0">Settings</span>
            <span className="flex items-center">
              <img src={arrow} alt="Arrow Icon" className="w-4 h-4 ml-2" />
            </span>
          </span>
          <span className="ml-2 font-roboto">Current Google account </span>
        </p>
      </div>

      <form className="mt-8">
        <div className="mb-4">
          <label htmlFor="currentGoogle" className="block text-lg mb-2">
            Current Google account
          </label>
          <input
            type="text"
            id="currentGoogle"
            className="border-2 rounded-full border-black w-full p-2 mb-2"
            placeholder="Enter new Google"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newGoogle" className="block text-lg mb-2">
            New Google
          </label>
          <input
            type="text"
            id="newGoogle"
            placeholder="Enter new Google"
            className="border-2 rounded-full border-black w-full p-2 mb-4"
          />
        </div>

        <div className={`flex mt-10 ${isMobile ? 'flex-col' : 'space-x-4'}`}>
          {!isMobile && (
            <button
              type="button"
              onClick={onCancelClick}
              className="cancel-button md:inline-block bg-white text-[#1E8357] border border-[#1E8357] px-36 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            className={`form-button w-full ${isMobile ? 'md:w-[100%]' : 'md:w-[50%]'} bg-[#1E8357] text-white px-4 py-2 rounded-lg`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeAccount;
