import { useState } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { useModalContext } from '../../context/modalContext';
import Modal from '../Modal';
import styles from './CreatePublicationCard.module.css';
import Location from './Location';
import { useUserContext } from '../../context/userContext';

const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export default function CreatePublicationCard({ setIsAutocompleteActive }) {
  const { openModal, modalState } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  //Obtengo id de usuario y mascota de local storage
  const { userId } = useUserContext();
  const { getPet } = useUserContext();
  const pet = getPet();
  // Estados para manejar los valores de los inputs del formulario
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('normal');
  const [location, setLocataion] = useState('');

  // Manejadores de cambio para los inputs
  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Asume que solo se sube una imagen
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  //Manejador del boton PUBLICAR
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('userId', userId);
    formData.append('petId', pet.petId);
    formData.append('address', location);

    console.log({ image, description, type, userId, pet, location });

    if (description === '' || image === null || location === '') {
      console.log('Faltan datos');
      setIsLoading(false);
      return;
    }

    await axios
      .post(`${API_URL_BASE}/api/v1/publication`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        openModal({
          description: 'Publication created successfully',
          chooseModal: false
        });
      })
      .catch((error) => {
        openModal({
          description: error,
          chooseModal: false
        });
      });
  };

  return (
    <div
      className={`hidden md:block m-4 p-4 rounded-md border border-secondary-300 relative ${styles.form}`}
    >
      {isLoading && <Spinner />}
      {modalState.isOpen && <Modal />}
      <form onSubmit={handleSubmit}>
        <ul className="flex absolute top-[-12px] left-12 bg-white border-2 border-primary-200 rounded-md">
          <li
            onClick={() => {
              setType('normal');
            }}
            className={`${type === 'normal' ? styles.active : ''}`}
          >
            Feed
          </li>
          <li
            onClick={() => {
              setType('Perdido');
            }}
            className={`${type === 'Perdido' ? styles.active : ''}`}
          >
            Lost
          </li>
          <li
            onClick={() => {
              setType('Adopcion');
            }}
            className={`${type === 'Adopcion' ? styles.active : ''}`}
          >
            In adoption
          </li>
        </ul>
        <input
          className="mt-4 block w-full border border-gray-300 rounded-full shadow-sm p-3 pl-6 text-gray-700"
          placeholder="Enter the description..."
          value={description}
          onChange={handleDescriptionChange}
        />
        <Location setIsAutocompleteActive={setIsAutocompleteActive} setLocataion={setLocataion} />
        <div className="flex justify-between mt-4">
          <label
            htmlFor="file-upload"
            className="bg-white rounded-md cursor-pointer border border-primary-200 py-2 px-6 flex items-center gap-x-2"
          >
            <span className="material-symbols-outlined">attachment</span>
            Attach
          </label>
          <input id="file-upload" type="file" onChange={handleImageChange} className="hidden" />
          <button className="px-4 py-2 bg-accent-300 text-white rounded-md" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
