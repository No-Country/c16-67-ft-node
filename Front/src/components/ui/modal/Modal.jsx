import React, { useEffect, useState } from 'react';
import { useModalContext } from '../../../context/modalContext';
import { FiX } from 'react-icons/fi';

const Modal = () => {
  const { modalState, closeModal } = useModalContext();
  const { isOpen, description, title, confirmBtn, denyBtn, chooseModal, error, onClick } =
    modalState;
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
      <div className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-[#0000007A] z-[1000]">
        <div className="fixed w-[71%] max-w-[448px] mx-5 p-5 px-5 rounded-[6px] bg-white shadow-[#FFECAA66]">
          <div className="flex justify-between w-full">
            <div className="py-[10px] font-bold text-[1.4rem]">{title}</div>
            <FiX
              className="hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:mr-0 md:text-[25px]"
              onClick={closeModal}
            />
          </div>
          <div className="my-[10px] text-[1.2rem] text-[#2D3748]">{description}</div>
          <div className="flex justify-end mt-[30px]">
            <button
              className="px-8 py-[5px] mr-[20px] w-[134px] text-[16px] bg-[#EAF8F2] text-[#1A202C] rounded-[6px] shadow-md font-semibold hover:bg-[#cce7db] hover:transition-all hover:duration-[0.5s] hover:ease-in-out "
              type="cancel"
              onClick={closeModal}
            >
              {denyBtn}
            </button>
            <button
              className="px-8 py-[5px] w-[134px] text-[16px] bg-[#B8682A] text-[#FAFAFA] rounded-[6px] shadow-md font-semibold hover:bg-[#9e673c] hover:transition-all hover:duration-[0.5s] hover:ease-in-out "
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
            className={`flex justify-evenly py-[10px] px-[15px] my-0 mx-5 shadow-md rounded-[5px] text-white ${error ? 'bg-[#E63333]' : 'bg-[#B8682A]'} ${!isFadingOut ? 'animate-fadeOutSelfClose' : 'animate-fadeInSelfClose'}`}
          >
            <div className="mr-[5px] font-500 text-white ">{description}</div>
            <button
              className="ml-1 hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150"
              type="x"
              onClick={() => {
                setTimeout(() => {
                  closeModal();
                }, 480);
                setIsFadingOut(false);
              }}
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
