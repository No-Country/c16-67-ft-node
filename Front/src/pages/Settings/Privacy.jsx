import React, { useState, useEffect } from 'react';
import arrow from '../../assets/images/arrow.svg';

const Privacy = ({ onCancelClick }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleCheckboxChange = (checkboxId) => {
    setSelectedCheckbox(checkboxId);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 760;

  return (
    <div className="max-w-[1000px] w-full bg-white p-8 mx-auto">
      <style>
        {`
          .form-checkbox-container {
            position: relative;
          }
          .form-checkbox {
            appearance: none;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            border: 3px solid #cbd5e1;
            transition: background 0.2s;
            position: relative;
          }
          .form-checkbox:checked {
            border-color: #1E8357;
          }
          .form-checkbox:checked::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background-color: #1E8357;
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
          <span className="ml-2 font-roboto">Privacy </span>
        </p>
      </div>
      <span className="text-2xl">Privacy of your account</span>
      <div className="form-checkbox-container flex items-center mt-4">
        <input
          type="checkbox"
          id="publicCheckbox"
          name="privacyCheckbox"
          className="form-checkbox"
          checked={selectedCheckbox === 'publicCheckbox'}
          onChange={() => handleCheckboxChange('publicCheckbox')}
        />
        <label htmlFor="publicCheckbox" className="text-lg ml-2 whitespace-nowrap">
          Public
        </label>
      </div>
      <p className="text-sm mt-2">
        If your account is public, any person inside and outside Petgram will be able to see your
        profile.
      </p>

      <div className="form-checkbox-container flex items-center mt-4">
        <input
          type="checkbox"
          id="privateCheckbox"
          name="privacyCheckbox"
          className="form-checkbox"
          checked={selectedCheckbox === 'privateCheckbox'}
          onChange={() => handleCheckboxChange('privateCheckbox')}
        />
        <label htmlFor="privateCheckbox" className="text-lg ml-2 whitespace-nowrap">
          Private
        </label>
      </div>
      <p className="text-sm mt-2">
        If your account is private, only your followers will be able to see your profile.
      </p>
      <div className={`flex mt-10 ${isMobile ? 'flex-col' : 'space-x-4'} buttons-container`}>
        {!isMobile && (
          <button
            type="button"
            onClick={onCancelClick}
            className="cancel-button md:w-[50%] w-full bg-white text-[#1E8357] border border-[#1E8357] px-4 py-2 rounded-lg"
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
    </div>
  );
};

export default Privacy;
