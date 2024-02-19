import React, { useEffect, useState } from 'react';
import { BiErrorAlt } from 'react-icons/bi';
import { useModalContext } from '../context/modalContext';
import TextInput from '../components/TextInput';
import Spinner from '../components/Spinner';
import { FiEdit, FiX } from 'react-icons/fi';
import { FaCirclePlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultProfile from '../assets/images/defaultProfile.jpg';

const Modal = () => {
  const { modalState, closeModal, openModal } = useModalContext();
  const { isOpen, description, title, confirmBtn, denyBtn, chooseModal, petModal, onClick } =
    modalState;
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [petModalOpen, setPetModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    fileInput.files[0];
    const userId = JSON.parse(localStorage.getItem('userId'));

    const payload = new FormData();
    payload.append('name', name);
    payload.append('age', age);
    payload.append('address', address);
    payload.append('description', description);
    payload.append('image', profilePhoto);
    payload.append('userId', userId);

    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_PRODUCTION}/api/v1/pet`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      openModal({
        description: 'Pet created successfully',
        chooseModal: false
      });
      navigate('/');
    } catch {
      openModal({
        description: 'An error has occurred',
        chooseModal: false
      });
    }
    setIsLoading(false);
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imgElement = document.getElementById('profilePhoto');
    const reader = new FileReader();
    reader.onload = (e) => {
      imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
    setProfilePhoto(file);
  };

  useEffect(() => {
    let timer;
    if (!chooseModal && !petModal && isOpen) {
      timer = setTimeout(() => {
        setIsFadingOut(false);
        setTimeout(() => {
          closeModal();
        }, 500);
      }, 4000);
    }
    setIsFadingOut(true);
    setPetModalOpen(true);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, chooseModal, petModal, closeModal]);

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
    ) : petModal ? (
      <>
        {isLoading && <Spinner />}
        <main>
          <section className="fixed flex flex-col-reverse left-0 right-0 bottom-0 bg-[#6F3B14B2] w-full h-full z-[100]">
            <form
              className={`p-6 bg-[#F2FBE7] rounded-t-[40px]  ${petModalOpen ? 'animate-petModalOpen' : 'animate-petModalClose'} `}
              onSubmit={onSubmit}
            >
              <div className="absolute flex flex-row-reverse left-0 w-full">
                <FiX
                  className="mr-6  text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer"
                  onClick={closeModal}
                />
              </div>
              <p className="mb-4 text-center text-[23px] font-bold">Create your pet´s profile</p>
              <div className="relative w-[80px] h-[80px] rounded-[50px] shadow-md m-auto mt-0 mb-3 bg-white z-50">
                <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
                <span
                  className="flex justify-center items-center absolute w-full h-full bg-[#0000] rounded-[50%] text-[0] text-center cursor-pointer hover:bg-[#0004] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:text-2xl z-50"
                  onClick={handleUploadButtonClick}
                >
                  <FiEdit />
                  <div className="absolute w-full flex flex-row-reverse bottom-0">
                    <FaCirclePlus className="text-[24px] mr-1" />
                  </div>
                </span>
                <img
                  src={defaultProfile}
                  className="w-full h-full rounded-[50%] object-cover"
                  id="profilePhoto"
                />
              </div>
              <TextInput
                placeholderText={'Pet´s name'}
                input={'input'}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <TextInput
                placeholderText={'Age'}
                input={'input'}
                val={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              <TextInput
                placeholderText={'Location'}
                input={'input'}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <TextInput
                placeholderText={'Profile description'}
                value={descriptions}
                onChange={(e) => {
                  setDescriptions(e.target.value);
                }}
              />
              <button className="block w-full p-2 mb-3 mx-auto text-white text-[18px] bg-[#E29900] rounded-[8px]">
                Create
              </button>
            </form>
          </section>
        </main>
      </>
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
