import React, { useState } from 'react';
import { useModalContext } from '../../../context/modalContext';
import Location from './Location';
import Spinner from '../../ui/Spinner';
import addPet from '../../../assets/images/addPet.svg';
import { FiX } from 'react-icons/fi';
import { postPublication } from '../../../service/publications/publicationsService';

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

    postPublication(formDataReq)
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
        <section className="fixed  flex flex-col-reverse  left-0 right-0 bottom-0 bg-[#0000007A] w-full h-full z-[100] md:flex md:flex-col md:items-center md:justify-center md:h-full">
          <form
            className={`container mx-auto max-w-2xl px-16 py-6 bg-white rounded-t-[40px] md:rounded-[24px] md:w-[50%] h-[87vh] md:mt-12 animate-petModalOpen`}
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-4">
              <p className="text-center text-[28px] ">Create Post</p>
              <FiX
                className="absolute top-0 right-0 mr-6 text-[20px] border-[2px] border-solid border-black rounded-[50%] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:scale-150 cursor-pointer md:mr-0 md:text-[25px]"
                onClick={() => closeModal()}
              />
            </div>
            <hr className="border-t-2 border-black w-full my-0" />
            <p className="grow mt-4 text-2xl leading-8 text-neutral-800">Choose the type of post</p>
            <div className="flex mb-4 mx grow mt-4">
              <button
                onClick={() => setFormData({ ...formData, type: 'Feed' })}
                className={`${formData.type === 'Feed' ? 'bg-[#B8682A] text-white border border-[#B8682A]' : 'text-yellow-800 border border-[#B8682A]'} cursor-pointer py-1 px-8 rounded-tl-md rounded-bl-md`}
              >
                Feed
              </button>

              <button
                onClick={() => setFormData({ ...formData, type: 'Lost' })}
                className={`${formData.type === 'Lost' ? 'bg-[#B8682A] text-white border border-[#B8682A]' : 'text-[#B8682A] border border-[#B8682A]'} cursor-pointer py-1 px-8`}
              >
                Lost
              </button>

              <button
                onClick={() => setFormData({ ...formData, type: 'Adoption' })}
                className={`${formData.type === 'Adoption' ? 'bg-[#B8682A] text-white border border-[#B8682A]' : 'text-[#B8682A] border border-[#B8682A]'} cursor-pointer py-1 px-8 rounded-tr-md rounded-br-md`}
              >
                Adoption
              </button>
            </div>

            <div className="relative mb-10 ">
            <label className="block text-gray-700 font-bold mb-2">
  Description
</label>
<textarea
  className="block w-full border border-gray-500 rounded-3xl shadow-sm py-3 px-4 text-lg text-gray-700 resize-none"
  rows="4"
  placeholder="Enter the description..."
  name="description"
  value={formData.description}
  onChange={handleChange}
></textarea>
</div>
 <div className='mb-8 '>
            <p className="  text-[20px]">Location</p>
            {/* Agrega tu componente Location aquí */}
            <Location setAddress={setAddress} />
</div>
            <p className="mb-3  text-[#176543]  font-bold text-[22px]">Attach</p>
            <label
              htmlFor="file-upload"
              className="rounded-ml  mb-6 cursor-pointer border  py-2 px-6 flex items-center gap-x-2"
              style={{ width: '150px', height: '125px', backgroundColor: '#EAF8F2' }}
            >
              <input id="file-upload" type="file" onChange={handleImageChange} className="hidden" />

              <div className="flex justify-center  items-center w-50 h-60  max-w-full">
  <img src={addPet} alt="icono" />
</div>

            </label>
            <div className="mb-10"></div>
            <button
              type="submit"
              className="block w-full p-2  mx-auto text-white text-[28px] bg-[#E29900] rounded-[8px]"
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