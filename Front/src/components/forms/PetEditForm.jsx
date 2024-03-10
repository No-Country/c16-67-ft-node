import { useState, useEffect } from 'react';
import { deletePetById, editPet, getPetsByUserId } from '../../service/pets/petService';
import { useUserContext } from '../../context/userContext';
import Spinner from '../ui/Spinner';
import { NavLink, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/images/back.svg';
import { BiTrash } from 'react-icons/bi';
import Modal from '../ui/modal/Modal';
import { useModalContext } from '../../context/modalContext';

export const PetEditForm = ({ formPrevData }) => {
  const { openModal, closeModal, modalTextState } = useModalContext();
  const [inputsData, setInputsData] = useState({});
  const [file, setFile] = useState(null); // Archivo seleccionado por el usuario
  const { setActivePet } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem('userId'));
  const navigate = useNavigate();

  // Carga los datos previos en el estado del formulario
  useEffect(() => {
    if (Object.keys(formPrevData).length > 0) {
      setInputsData({
        name: formPrevData.name || '',
        age: formPrevData.age || '',
        description: formPrevData.description || '',
        image_url: formPrevData.image_url || ''
      });
    }
  }, [formPrevData]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setInputsData({ ...inputsData, [property]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // Guardar el archivo para enviarlo luego

      // Leer el archivo para la vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        // Actualizar el estado con la URL de la imagen para la vista previa
        setInputsData((prevInputsData) => ({ ...prevInputsData, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePet = () => {
    setIsLoading(true);
    getPetsByUserId(userId).then((res) => {
      setIsLoading(false);
      if (res.data.length === 1) {
        res.data[0];
        openModal({
          description: 'You can´t delete your last pet!',
          error: true,
          chooseModal: false
        });
      } else {
        openModal({
          title: 'Delete pet',
          description: (
            <div className="inline md:flex md:flex-row items-center">
              <p className="inline text-[16px] text-[#2D3748] mr-1">Are you sure? </p>
              <p className="inline text-[16px] text-error-800">
                You can’t undo this action afterwards.
              </p>
            </div>
          ),
          confirmBtn: 'Delete',
          denyBtn: 'Cancel',
          onClick: () => {
            setIsLoading(true);
            deletePetById(formPrevData.petId)
              .then(() => {
                setIsLoading(false);
                closeModal();
                getPetsByUserId(userId).then((updatedRes) => {
                  if (updatedRes.data.length > 0) {
                    const newActivePet = updatedRes.data[0];
                    setActivePet(newActivePet);
                    openModal({
                      description: 'Pet deleted successfully',
                      chooseModal: false
                    });
                    navigate('/profile');
                  }
                });
              })
              .catch(() => {
                openModal({
                  description: 'An error has occurred',
                  error: true,
                  chooseModal: false
                });
              });
          },
          chooseModal: true
        });
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let i = 0;
    Object.keys(formPrevData).forEach((key) => {
      if (inputsData[key] === formPrevData[key]) {
        i++;
      }
    });
    if (
      inputsData.name === '' ||
      inputsData.age === '' ||
      inputsData.description === '' ||
      inputsData.image_url === ''
    ) {
      openModal({
        description: 'Please, complete all the fields.',
        error: true,
        chooseModal: false
      });
      return;
    }
    if (i === Object.keys(inputsData).length) {
      openModal({
        description: 'You have to make a change.',
        error: true,
        chooseModal: false
      });
      return;
    }
    setIsLoading(true);
    let { data } = await editPet(formPrevData.petId, inputsData, file);
    data.username = formPrevData.username; //to-do agregar en respuesta del back
    const petEdited = data;
    setActivePet(petEdited);
    setIsLoading(false);
    navigate('/profile');
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {modalTextState.isOpen && <Modal />}
          <main className="my-4 mx-4 md:my-12 md:mx-12">
            <div className="flex gap-x-2 items-center">
              <NavLink to="/profile" className="text-sm text-gray-500 hover:text-gray-800">
                <img src={backIcon} alt="Back icon" className="h-6 w-6 md:hidden" />
              </NavLink>
              <h2 className="text-headline-sm md:text-headline-lg">Edit profile</h2>
            </div>
            <form className="flex flex-col items-center gap-4 py-4" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={inputsData.image ? inputsData.image : inputsData.image_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/*Para el boton de cambiar imagen*/}
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-0 right-0 bg-secondary-700 text-white p-2 rounded-full cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                    />
                  </svg>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    name="image"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <input
                type="text"
                placeholder="Name"
                className="w-full border border-black rounded-md pl-4 p-2 mb-4"
                maxLength={25}
                name="name"
                value={inputsData.name}
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full border border-black rounded-md pl-4 p-2 mb-4"
                name="age"
                value={inputsData.age}
                onChange={handleChange}
              />
              <textarea
                placeholder="Descripción"
                className="w-full border min-h-24 max-h-36 border-black rounded-md p-2 pl-4 mb-4"
                maxLength={100}
                name="description"
                value={inputsData.description}
                onChange={handleChange}
              ></textarea>
              <button
                type="submit"
                className="bg-secondary-700 text-white text-body-lg h-12 w-full rounded-md"
              >
                Save
              </button>
            </form>
            <div
              className="flex justify-between items-center w-[130px] p-2 mt-20 text-headline-md text-secondary-700 font-bold rounded-md cursor-pointer hover:bg-error-600 hover:text-white hover:transition-all hover:duration-[0.4s] hover:ease-in-out"
              onClick={deletePet}
            >
              <BiTrash />
              <p className="text-body-lg">Delete pet</p>
            </div>
          </main>
        </>
      )}
    </>
  );
};
