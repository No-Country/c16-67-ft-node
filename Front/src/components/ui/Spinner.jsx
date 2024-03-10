import React from 'react';
import spinner from '../../assets/images/foots.png';

const Spinner = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#111111bd] z-[1000]">
      <div className="relative w-[100px] h-[100px] animate-spin">
        <div className="absolute w-full h-full rounded-[50%] border-x-[5px] border-y-[5px] border-transparent border-t-[#fff] box-border"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={spinner} alt="logo-spinner" className="object-cover animate-increment" />
      </div>
    </div>
  );
};

export default Spinner;
