import React, { useState } from 'react';
import { useModalContext } from '../../context/modalContext';
import Location from './Location';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import defaultProfileIcon from '../../assets/images/defaultProfile.jpg';
import { FiX } from 'react-icons/fi';

const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

const ModalPost = ({ closeModal }) => {
  const { openModal } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    image: null,
    type: 'Feed'
  });
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { petId } = JSON.parse(localStorage.getItem('pet'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  //Manejador del boton PUBLICAR
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formDataReq = new FormData();
    formDataReq.append('image', formData.image);
    formDataReq.append('description', formData.description);
    formDataReq.append('type', formData.type);
    formDataReq.append('userId', userId);
    formDataReq.append('petId', petId);
    formDataReq.append('address', address);

    if (formData.description === '' || formData.image === null || formData.address === '') {
      console.log('Faltan datos');
      setIsLoading(false);
      return;
    }
    console.log(userId);

    await axios
      .post(`${API_URL_BASE}/api/v1/publication`, formDataReq, {
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
        console.error(error);
        openModal({
          description: error,
          chooseModal: false
        });
      });
  };

  // const handleClickOutside = (event) => {
  //   const form = event.target.closest('form');
  //   if (!form) {
  //     closeModal();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('click', handleClickOutside);
  //   return () => {
  //     window.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <main>
        <section className="fixed flex flex-col-reverse left-0 right-0 bottom-0 bg-[#0000007A] w-full h-full z-[100] md:flex md:flex-col md:items-center md:justify-center md:h-full">
          <form
            className={`p-6 bg-white rounded-t-[40px] md:rounded-[24px] md:w-[50%] h-[90vh] md:mt-12 animate-petModalOpen`}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-4">
              <p className="text-center text-[28px] font-bold">Create Post</p>
              <FiX
                className="absolute top-0 right-0 mr-6 text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:mr-0 md:text-[25px]"
                onClick={() => closeModal()}
              />
            </div>
            <hr className="border-black mb-4" />
            <p className="mb-4 text-[28px]">Choose the type of post</p>
            <div className="flex mb-4">
              <button
                onClick={() => setFormData({ ...formData, type: 'Feed' })}
                className={`${formData.type === 'Feed' ? 'bg-yellow-800 text-white border border-yellow-900' : 'text-yellow-800 border border-yellow-900'} cursor-pointer py-1 px-2 rounded-tl-md rounded-bl-md`}
              >
                Feed
              </button>

              <button
                onClick={() => setFormData({ ...formData, type: 'Lost' })}
                className={`${formData.type === 'Lost' ? 'bg-yellow-800 text-white border border-yellow-900' : 'text-yellow-800 border border-yellow-900'} cursor-pointer py-1 px-2`}
              >
                Lost
              </button>

              <button
                onClick={() => setFormData({ ...formData, type: 'Adoption' })}
                className={`${formData.type === 'Adoption' ? 'bg-yellow-800 text-white border border-yellow-900' : 'text-yellow-800 border border-yellow-900'} cursor-pointer py-1 px-2 rounded-tr-md rounded-br-md`}
              >
                Adoption
              </button>
            </div>

            <div className="relative mb-4">
              <input
                className="mt-4 block w-full border border-gray-300 rounded-md shadow-sm p-9 pl-6 text-gray-700"
                placeholder="Enter the description..."
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <p className="mb-4 text-[28px]">Location</p>
            {/* Agrega tu componente Location aquí */}
            <Location setAddress={setAddress} />

            <p className="mb-4  text-[#176543] text-[28px]">Attach</p>
            <label
              htmlFor="file-upload"
              className="rounded-ml cursor-pointer border border-secondary-800 py-2 px-6 flex items-center gap-x-2"
              style={{ width: '150px', height: '125px', backgroundColor: '#EAF8F2' }}
            >
              <input id="file-upload" type="file" onChange={handleImageChange} className="hidden" />

              <div className="w-20 h-22 max-w-full">
                <img src={defaultProfileIcon} alt="icono" />
              </div>
            </label>

            <button
              type="submit"
              className="block w-full p-2 mb-3 mx-auto text-white text-[28px] bg-[#E29900] rounded-[8px]"
            >
              Post
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default ModalPost;
