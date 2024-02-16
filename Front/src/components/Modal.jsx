import React, { useEffect, useState } from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { useModalContext } from '../context/modalContext';

const Modal = () => {
  const { modalState, closeModal } = useModalContext();
  const { isOpen, description, title, confirmBtn, denyBtn, chooseModal, onClick } = modalState;
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let timer;
    if (!chooseModal && isOpen) {
      timer = setTimeout(() => {
        setIsFadingOut(false);
        setTimeout(() => {
          closeModal();
        }, 500);
      }, 4000);
    }
    setIsFadingOut(true);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, chooseModal, closeModal]);

  return isOpen ? (
    chooseModal ? (
      <div className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-[#00000096] z-[1000]">
        <div className="fixed w-[71%] max-w-[370px] my-0 mx-5 pt-0 pb-5 px-5 rounded-[10px] bg-white shadow-md">
          <div className="flex justify-center object-contain">
            <BiErrorAlt className="relative bottom-[25px] rounded-[30px] text-[60px] bg-white text-[#b23131]" />
          </div>
          <div className="pb-[10px] text-center font-bold text-[1.4rem] border-b-2 border-solid">
            {title.toUpperCase()}
          </div>
          <div className="my-[10px] mx-[5px] text-center text-[1.2rem] italic">{description}</div>
          <div className="flex justify-between mt-[30px]">
            <button
              className="px-8 py-[5px] text-[16px] bg-[#b23131] text-white rounded-[10px] shadow-md hover:bg-[#7a3232] hover:transition-all hover:duration-[0.5s] hover:ease-in-out "
              type="cancel"
              onClick={closeModal}
            >
              {denyBtn}
            </button>
            <button
              className="px-8 py-[5px] text-[16px] bg-[#4E9745] text-white rounded-[10px] shadow-md  hover:bg-[#305c2a] hover:transition-all hover:duration-[0.5s] hover:ease-in-out "
              type="submit"
              onClick={onClick}
            >
              {confirmBtn}
            </button>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="flex justify-center items-center fixed left-0 right-0 bottom-[10px] z-[999]">
          <div
            className={`flex justify-evenly py-[10px] px-[15px] my-0 mx-5 shadow-md rounded-[5px] text-white bg-[#4a2e1a] ${
              !isFadingOut ? 'animate-fadeOutSelfClose' : 'animate-fadeInSelfClose'
            }`}
          >
            <div className="mr-[5px] font-500 text-white ">{description}</div>
            <button
              className="ml-1 hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150"
              type="x"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      </>
    )
  ) : null;
};

export default Modal;
