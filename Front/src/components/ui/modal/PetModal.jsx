import React, { useState } from 'react';
import { useModalContext } from '../../../context/modalContext';
import TextInput from '../TextInput';
import Spinner from '../Spinner';
import { FiEdit, FiX } from 'react-icons/fi';
import { FaCirclePlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../../assets/images/defaultProfile.jpg';
import { useUserContext } from '../../../context/userContext';
import { createPet } from '../../../service/pets/petCreation';

const PetModal = () => {
  const { modalState, closeModal, openModal } = useModalContext();
  const { isOpen, petModal, xBtnPetModal } = modalState;
  const [petModalOpen, setPetModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { setActivePet } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    fileInput.files[0];
    const userId = JSON.parse(localStorage.getItem('userId'));

    const payload = new FormData();
    payload.append('name', name);
    payload.append('age', age);
    payload.append('address', '123');
    payload.append('description', descriptions);
    payload.append('image', profilePhoto);
    payload.append('userId', userId);

    setIsLoading(true);

    createPet(payload)
      .then((response) => {
        setActivePet(response.data.data);
        openModal({
          description: 'Pet created successfully',
          chooseModal: false
        });
        navigate('/');
      })
      .catch(() => {
        openModal({
          description: 'An error has occurred',
          chooseModal: false,
          error: true
        });
        setIsLoading(false);
      });
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

  return isOpen ? (
    petModal ? (
      <>
        {isLoading && <Spinner />}
        <main className="p-0">
          <section className="fixed flex flex-col-reverse left-0 right-0 bottom-0 bg-[#0000007A] w-full h-full z-[100] md:flex md:flex-col md:items-center md:justify-center md:h-full ">
            <form
              className={`p-6 bg-[#FAFAFA] rounded-t-[40px] md:rounded-[24px] md:w-[50%] ${!petModalOpen ? 'animate-petModalOpen' : 'animate-petModalClose'} `}
              onSubmit={onSubmit}
            >
              {xBtnPetModal ? (
                <div className="absolute flex flex-row-reverse left-0 w-full md:relative">
                  <FiX
                    className="mr-6 text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:mr-0 md:text-[25px]"
                    onClick={() => {
                      setTimeout(() => {
                        closeModal();
                      }, 480);
                      setPetModalOpen(true);
                    }}
                  />
                </div>
              ) : null}
              <p className="mb-4 text-center text-[23px] font-bold md:text-[48px] md:font-semibold">
                Create your pet´s profile
              </p>
              <div className="relative w-[80px] h-[80px] rounded-[50%] shadow-md m-auto mt-0 mb-3 bg-white z-50 md:mt-10 md:w-[130px] md:h-[130px]">
                <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
                <span
                  className="flex justify-center items-center absolute w-full h-full bg-[#0000] rounded-[50%] text-[0] text-center cursor-pointer hover:bg-[#0004] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:text-2xl z-50"
                  onClick={handleUploadButtonClick}
                >
                  <FiEdit />
                  <div className="absolute w-full flex flex-row-reverse bottom-0">
                    <FaCirclePlus className="text-[24px] mr-1 md:text-[39px]" />
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
                placeholderText={'Profile description'}
                value={descriptions}
                onChange={(e) => {
                  setDescriptions(e.target.value);
                }}
              />
              <button className="block w-full p-2 mb-3 mx-auto text-white text-[18px] bg-[#B8682A] rounded-[8px] md:text-[28px]">
                Create
              </button>
            </form>
          </section>
        </main>
      </>
    ) : null
  ) : null;
};

export default PetModal;
