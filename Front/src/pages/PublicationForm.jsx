import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useModalContext } from '../context/modalContext';
import Modal from '../components/Modal';
import { useUserContext } from '../context/userContext';
import { useNavigateContext } from '../context/navigationContext';

const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

function PublicationForm() {
  const { openModal, modalState } = useModalContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //Obtengo id de usuario y mascota de local storage
  const { petId, userId } = useUserContext();
  // Estados para manejar los valores de los inputs del formulario
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState([]);
  const { setActive } = useNavigateContext();

  setActive('publication-create');

  // Manejadores de cambio para los inputs
  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Asume que solo se sube una imagen
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTypeChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setType(selectedOptions);
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
    formData.append('petId', petId);

    try {
      await axios.post(`${API_URL_BASE}/api/v1/publication`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      openModal({
        description: 'Publication created successfully',
        chooseModal: false
      });
      navigate('/');
    } catch {
      openModal({
        description: 'An error has occurred',
        chooseModal: false,
        error: true
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {modalState.isOpen && <Modal />}
      <main className="bg-slate-100 h-[100vh]">
        <form className="space-y-4 max-w-md mx-auto">
          <div className="pt-20">
            <div className="flex justify-center">
              <h2 className="text-m font-medium text-gray-700">Crear Publicación</h2>
            </div>
            <label className="block text-sm font-medium text-gray-700">Imagen</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-700"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 h-24"
              maxLength="50"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              multiple={true}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-700"
              value={type}
              onChange={handleTypeChange}
            >
              <option value="normal">Normal</option>
              <option value="perdido">Perdido</option>
              <option value="adopcion">Adopción</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button className="mt-2 px-4 py-2 bg-blue" type="submit" onClick={handleSubmit}>
              Publicar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default PublicationForm;
