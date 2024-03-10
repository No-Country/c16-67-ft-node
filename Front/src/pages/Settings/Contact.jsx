import React, { useState, useEffect } from 'react';
import arrow from '../../assets/images/arrow.svg';

const Contact = ({ onCancelClick }) => {
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

  const isMobile = windowWidth <= 667;

  return (
    <div className="max-w-[767px] w-full bg-white p-8 mx-auto">
      <style>
        {`
          .cancel-button {
            width: 100%;
            margin-bottom: 8px;
            ${isMobile ? 'display: none;' : ''}
          }
          .description-input {
            border: 2px solid #cbd5e1;
            border-radius: 8px;
          }
          .form-button {
            background-color: #1E8357;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            display: inline-block;
          }
          .input-long {
            width: calc(100% - 16px);
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
          <span className="ml-2 font-roboto">Report an Issue Component </span>
        </p>
      </div>

      <form className="mt-8">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Your E-mail
          </label>
          <input
            type="text"
            id="email"
            placeholder="E-mail@gmail.com"
            className="border-2 rounded-full border-black w-full p-2 mb-4 input-long"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="What is your issue about?"
            className="border-2 rounded-full border-black w-full p-2 mb-4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-bold mb-2">
            Description
          </label>
          <input
            id="text"
            type="text"
            placeholder="Tell us in detail about the issue"
            className="description-input border-2 rounded-lg border-black h-[130px] w-full p-2 mb-4"
          />
        </div>

        <div className={`flex mt-10 ${isMobile ? 'flex-col' : 'space-x-4'} buttons-container`}>
          {!isMobile && (
            <button
              type="button"
              onClick={onCancelClick}
              className="ccancel-button md:inline-block bg-white text-[#1E8357] border border-[#1E8357] px-36 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            className={`save-button w-full ${isMobile ? 'md:w-[100%]' : 'md:w-[50%]'} bg-[#1E8357] text-white px-4 py-2 rounded-lg`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
