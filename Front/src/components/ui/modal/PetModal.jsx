import { useState } from 'react';
import { useModalContext } from '../../../context/modalContext';
import { FiEdit, FiX } from 'react-icons/fi';
import { FaCirclePlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/userContext';
import { setFormAndPostPet } from '../../../service/pets/petService';
import { changeLastPet } from '../../../service/users/userService';
import { validateImages } from '../../../service/utils/utilsService';
import { ErrorMessage } from '../ErrorMessage';
import Spinner from '../Spinner';
import defaultProfile from '../../../assets/images/createPet.svg';
import Modal from './Modal';
import TextInput from '../TextInput';

const PetModal = () => {
  const navigate = useNavigate();
  const { petModalState, modalTextState, closeModal, openModal } = useModalContext();
  const { setActivePet } = useUserContext();
  const { isOpen, xBtnPetModal } = petModalState;
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [username, setUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errors, setErrors] = useState({ profilePhoto: '' });

  const onSubmit = (event) => {
    event.preventDefault();

    if (errors.profilePhoto === '') {
      setFormAndPostPet({
        navigate,
        changeLastPet,
        setIsLoading,
        setErrors,
        setUsername,
        setPetModalOpen,
        setActivePet,
        openModal,
        username,
        name,
        age,
        descriptions,
        profilePhoto,
        closeModal
      });
    }
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateImages(file, setErrors);
    const imgElement = document.getElementById('profilePhoto');
    const reader = new FileReader();
    reader.onload = (e) => {
      imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
    setProfilePhoto(file);
  };

  return isOpen ? (
    <>
      {isLoading && <Spinner />}
      {modalTextState.isOpen && <Modal />}
      <main className="p-0">
        <section className="fixed flex flex-col-reverse left-0 right-0 bottom-0 md:px-16 bg-[#0000007A] w-full h-full z-[100] md:flex md:flex-col md:items-center md:justify-center md:h-full ">
          <form
            className={` bg-[#FAFAFA] rounded-t-[40px] md:rounded-[24px] md:max-w-[900px] md:w-full ${!petModalOpen ? 'animate-petModalOpen md:animate-appearOpen' : 'animate-petModalClose md:animate-appearClose'} `}
            onSubmit={onSubmit}
          >
            <div className="relative">
              {xBtnPetModal ? (
                <div className="absolute flex flex-row-reverse top-6 w-fit right-0 md:right-6">
                  <FiX
                    className="mr-6 text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:mr-0 md:text-[25px]"
                    onClick={() => {
                      setTimeout(() => {
                        closeModal();
                      }, 400);
                      setPetModalOpen(true);
                    }}
                  />
                </div>
              ) : null}
              <p className="mb-4 text-center text-title-lg font-bold md:text-display-md md:border-b border-black h-20 grid place-items-center">
                Create your pet´s profile
              </p>
            </div>
            <div className="relative w-20 h-20 rounded-full shadow-md m-auto mt-0 mb-3 bg-white z-50 md:mt-10 md:w-[130px] md:h-[130px]">
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
            <ErrorMessage message={errors.profilePhoto}></ErrorMessage>
            <div className="px-6 md:px-14 pb-6">
              <TextInput
                placeholderText={'Pet´s name'}
                input={'input'}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextInput
                placeholderText={'Pet´s username'}
                input={'input'}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextInput
                placeholderText={'Age'}
                input={'input'}
                value={age}
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
              <button className="block w-full mb-3 mx-auto h-10 md:h-14 text-white  bg-primary-700 rounded-lg text-title-lg md:text-[28px]">
                Create
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  ) : null;
};

export default PetModal;
