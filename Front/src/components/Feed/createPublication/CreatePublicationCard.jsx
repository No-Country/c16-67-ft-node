import React, { useState } from 'react';
import ModalPost from './ModalPost';
import defaultProfile from '../../../assets/images/defaultProfile.jpg';
import { useUserContext } from '../../../context/userContext';

const CreatePublicationCard = ({ pet, getDataFeed }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { getPet } = useUserContext();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const activePet = pet || getPet();

  return (
    <div
      onClick={handleOpenModal}
      className="hidden md:flex items-start max-w-full mb-6 rounded-lg p-4 mx-2 md:mx-0 cursor-pointer"
    >
      {/* Imagen redonda */}
      <img
        className="md:h-8 md:w-8 lg:h-16 lg:w-16 mt-4 mr-2 rounded-full border-2 border-slate-200 object-cover"
        src={activePet?.image_url || defaultProfile}
        alt="image of active pet"
        onError={(e) => {
          e.target.src = defaultProfile; // Manejar error de carga de imagen
        }}
      />

      <div className="flex flex-col flex-1 mt-2 w-full">
        {/* Texto del post */}
        <input
          className="mt-4 block w-full border border-gray-300 rounded-full shadow-sm p-3 pl-6 text-gray-700 cursor-pointer outline-none hover:bg-secondary-50"
          placeholder="Create Post"
        />

        {/* Iconos Attach y Location */}
        <div className="flex gap-5 justify-between self-start mt-1.5 font-bold text-green-800 whitespace-nowrap">
          {/* Icono Attach */}
          <div className="flex gap-2.5 justify-between py-1 rounded-lg">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c35a9f326467e0dd9894c0186dae85d1eff08ff83b928692eb8d5e02ed3bafb6?"
              className="w-6 aspect-square"
            />
            <div className="my-auto">Attach</div>
          </div>

          {/* Icono Location */}
          <div className="flex gap-2.5 justify-between py-1 rounded-lg">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd1878bca7ea5f726d04178f868b7dc7b4e543c4185ecfac9668a020f07d3945?"
              className="w-6 aspect-square"
            />
            <div>Location</div>
          </div>
        </div>
      </div>

      {/* Renderiza el modal si isModalOpen es true */}
      {isModalOpen && <ModalPost closeModal={handleCloseModal} getDataFeed={getDataFeed} />}
    </div>
  );
};

export default CreatePublicationCard;
