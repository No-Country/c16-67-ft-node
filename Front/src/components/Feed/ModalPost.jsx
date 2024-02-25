import React, { useState, useEffect } from 'react';
import { useModalContext } from '../../context/modalContext';
import Location from './Location';
import Spinner from '../../components/Spinner';
import { FaFileAlt } from 'react-icons/fa';
import axios from 'axios';
import { useUserContext } from '../../context/userContext';

const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

const ModalPost = ({ setIsAutocompleteActive }) => {
  const { closeModal, openModal } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    image: null,
    type: 'Feed',
  });
  const { setActivePet } = useUserContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (!validateForm()) {
      console.log('Faltan datos');
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('userId', userId);
    formDataToSend.append('petId', formData.petId); // Necesitas definir petId en algún lugar
    formDataToSend.append('address', formData.address);

    try {
      const response = await axios.post(`${API_URL_BASE}/api/v1/publication`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      setIsLoading(false);
      openModal({
        description: 'Publication created successfully',
        chooseModal: false,
      });
      // Reset form or close modal as needed
    } catch (error) {
      openModal({
        description: error.message,
        chooseModal: false,
      });
    }
  };

  const validateForm = () => {
    return formData.address && formData.description && formData.image;
  };

  const handleClickOutside = (event) => {
    const form = event.target.closest('form');
    if (!form) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <main>
        <section
          className="fixed flex flex-col-reverse left-0 right-0 bottom-0 bg-[#0000007A] w-full h-full z-[100] md:flex md:flex-col md:items-center md:justify-center md:h-full"
          onClick={handleClickOutside}
        >
           <button
              className="px-8 py-[5px] text-[16px] bg-[#E63333] text-white rounded-[10px] shadow-md hover:bg-[#7a3232] hover:transition-all hover:duration-[0.5s] hover:ease-in-out "
              type="cancel"
              onClick={closeModal}
            >
              
            </button>
          <form
            className={`p-6 bg-white rounded-t-[40px] md:rounded-[24px] md:w-[50%] h-[90vh] md:mt-12 animate-petModalOpen`}
            onSubmit={onSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mb-4">
              <p className="text-center text-[28px] font-bold">Create Post</p>
            </div>
            <hr className="border-black mb-4" />
            <p className="mb-4 text-[28px]">Choose the type of post</p>
            <div className="flex mb-4">
              <button
                onClick={() => setFormData({ ...formData, type: 'Feed' })}
                className={`${
                  formData.type === 'Feed'
                    ? 'bg-yellow-800 text-white border border-yellow-900'
                    : 'text-yellow-800 border border-yellow-900'
                } cursor-pointer py-1 px-2 rounded-tl-md rounded-bl-md`}
              >
                Feed
              </button>

              <button
                onClick={() => setFormData({ ...formData, type: 'Lost' })}
                className={`${
                  formData.type === 'Lost'
                    ? 'bg-yellow-800 text-white border border-yellow-900'
                    : 'text-yellow-800 border border-yellow-900'
                } cursor-pointer py-1 px-2`}
              >
                Lost
              </button>

              <button
                onClick={() => setFormData({ ...formData, type: 'Adoption' })}
                className={`${
                  formData.type === 'Adoption'
                    ? 'bg-yellow-800 text-white border border-yellow-900'
                    : 'text-yellow-800 border border-yellow-900'
                } cursor-pointer py-1 px-2 rounded-tr-md rounded-br-md`}
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
            <div className="mt-4 relative">
              <input
                className="mt-4 block w-full border border-gray-300 rounded-md shadow-sm p-3 pl-6 text-gray-700"
                placeholder=" Where are you?"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <p className="mb-4  text-[#176543] text-[28px]">Attach</p>
            <label
  htmlFor="file-upload"
  className="rounded-ml cursor-pointer border border-secondary-800 py-2 px-6 flex items-center gap-x-2"
  style={{ width: '150px', height: '125px', backgroundColor: '#EAF8F2' }}
>
  <input id="file-upload" type="file" onChange={handleImageChange} className="hidden" />
  
  <div className="w-20 h-22 max-w-full">
    <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ... (Tu código SVG aquí) ... */}
      <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.7">
<rect width="100" height="90" fill="white"/>
<path d="M36.25 31.5C42.453 31.5 47.5 26.4537 47.5 20.25C47.5 14.0463 42.453 9 36.25 9C30.047 9 25 14.0463 25 20.25C25 26.4537 30.047 31.5 36.25 31.5ZM36.25 13.5C39.696 13.5 42.5 16.5276 42.5 20.25C42.5 23.9724 39.696 27 36.25 27C32.804 27 30 23.9724 30 20.25C30 16.5276 32.804 13.5 36.25 13.5ZM16.25 49.5C22.453 49.5 27.5 44.4537 27.5 38.25C27.5 32.0463 22.453 27 16.25 27C10.047 27 5 32.0463 5 38.25C5 44.4537 10.047 49.5 16.25 49.5ZM16.25 31.5C19.696 31.5 22.5 34.5276 22.5 38.25C22.5 41.9724 19.696 45 16.25 45C12.804 45 10 41.9724 10 38.25C10 34.5276 12.804 31.5 16.25 31.5ZM83.75 49.5C89.953 49.5 95 44.4537 95 38.25C95 32.0463 89.953 27 83.75 27C77.547 27 72.5 32.0463 72.5 38.25C72.5 44.4537 77.547 49.5 83.75 49.5ZM83.75 31.5C87.196 31.5 90 34.5276 90 38.25C90 41.9724 87.196 45 83.75 45C80.304 45 77.5 41.9724 77.5 38.25C77.5 34.5276 80.304 31.5 83.75 31.5ZM63.75 31.5C69.953 31.5 75 26.4537 75 20.25C75 14.0463 69.953 9 63.75 9C57.547 9 52.5 14.0463 52.5 20.25C52.5 26.4537 57.547 31.5 63.75 31.5ZM63.75 13.5C67.196 13.5 70 16.5276 70 20.25C70 23.9724 67.196 27 63.75 27C60.304 27 57.5 23.9724 57.5 20.25C57.5 16.5276 60.304 13.5 63.75 13.5ZM47.5 69.75H52.5V63H60V58.5H52.5V51.75H47.5V58.5H40V63H47.5V69.75Z" fill="#6F3B14"/>
<path d="M38.508 81H61.492C71.714 81 80 73.5426 80 64.3428C80 60.5601 78.57 56.8908 75.944 53.937L65.557 42.2514C63.823 40.3008 61.6238 38.7262 59.1222 37.6441C56.6206 36.562 53.8806 36.0001 51.105 36H48.896C46.1204 36.0001 43.3804 36.562 40.8788 37.6441C38.3772 38.7262 36.178 40.3008 34.444 42.2514L24.056 53.937C21.4304 56.8905 20 60.5603 20 64.3428C20 73.5426 28.286 81 38.508 81ZM29.912 58.1544L40.3 46.4679C41.3287 45.3051 42.6363 44.3666 44.1248 43.7228C45.6134 43.079 47.2445 42.7464 48.896 42.75H51.105C54.467 42.75 57.6 44.1054 59.701 46.4679L70.088 58.1535C71.6469 59.9116 72.4972 62.0935 72.5 64.3428C72.5 69.8058 67.562 74.25 61.492 74.25H38.508C32.438 74.25 27.5 69.8058 27.5 64.3428C27.5 62.1018 28.357 59.904 29.912 58.1544Z" fill="#6F3B14"/>
</g>
<path d="M24.6762 106.373L21.7025 115H19.9047L23.6508 105.047H24.7992L24.6762 106.373ZM27.1645 115L24.184 106.373L24.0541 105.047H25.2094L28.9691 115H27.1645ZM27.0209 111.309V112.669H21.6068V111.309H27.0209ZM34.5311 113.469V104.5H36.1854V115H34.6883L34.5311 113.469ZM29.7186 111.384V111.24C29.7186 110.68 29.7846 110.169 29.9168 109.709C30.049 109.244 30.2404 108.845 30.491 108.513C30.7417 108.175 31.047 107.918 31.407 107.74C31.7671 107.558 32.1727 107.467 32.6238 107.467C33.0704 107.467 33.4624 107.553 33.7996 107.727C34.1368 107.9 34.424 108.148 34.6609 108.472C34.8979 108.791 35.087 109.174 35.2283 109.62C35.3696 110.062 35.4699 110.554 35.5291 111.097V111.555C35.4699 112.083 35.3696 112.566 35.2283 113.004C35.087 113.441 34.8979 113.82 34.6609 114.139C34.424 114.458 34.1346 114.704 33.7928 114.877C33.4555 115.05 33.0613 115.137 32.6102 115.137C32.1635 115.137 31.7602 115.043 31.4002 114.856C31.0447 114.67 30.7417 114.408 30.491 114.07C30.2404 113.733 30.049 113.337 29.9168 112.881C29.7846 112.421 29.7186 111.922 29.7186 111.384ZM31.366 111.24V111.384C31.366 111.721 31.3956 112.035 31.4549 112.327C31.5187 112.619 31.6167 112.876 31.7488 113.1C31.881 113.318 32.0519 113.492 32.2615 113.619C32.4757 113.742 32.7309 113.804 33.0271 113.804C33.4008 113.804 33.7085 113.722 33.95 113.558C34.1915 113.394 34.3807 113.173 34.5174 112.895C34.6587 112.612 34.7544 112.298 34.8045 111.951V110.714C34.7771 110.445 34.7202 110.194 34.6336 109.962C34.5516 109.729 34.4399 109.527 34.2986 109.354C34.1574 109.176 33.9819 109.039 33.7723 108.943C33.5672 108.843 33.3234 108.793 33.0408 108.793C32.74 108.793 32.4848 108.857 32.2752 108.984C32.0656 109.112 31.8924 109.287 31.7557 109.511C31.6235 109.734 31.5255 109.994 31.4617 110.29C31.3979 110.586 31.366 110.903 31.366 111.24ZM42.5197 113.469V104.5H44.174V115H42.677L42.5197 113.469ZM37.7072 111.384V111.24C37.7072 110.68 37.7733 110.169 37.9055 109.709C38.0376 109.244 38.229 108.845 38.4797 108.513C38.7303 108.175 39.0357 107.918 39.3957 107.74C39.7557 107.558 40.1613 107.467 40.6125 107.467C41.0591 107.467 41.451 107.553 41.7883 107.727C42.1255 107.9 42.4126 108.148 42.6496 108.472C42.8866 108.791 43.0757 109.174 43.217 109.62C43.3583 110.062 43.4585 110.554 43.5178 111.097V111.555C43.4585 112.083 43.3583 112.566 43.217 113.004C43.0757 113.441 42.8866 113.82 42.6496 114.139C42.4126 114.458 42.1232 114.704 41.7814 114.877C41.4442 115.05 41.05 115.137 40.5988 115.137C40.1522 115.137 39.7489 115.043 39.3889 114.856C39.0334 114.67 38.7303 114.408 38.4797 114.07C38.229 113.733 38.0376 113.337 37.9055 112.881C37.7733 112.421 37.7072 111.922 37.7072 111.384ZM39.3547 111.24V111.384C39.3547 111.721 39.3843 112.035 39.4436 112.327C39.5074 112.619 39.6053 112.876 39.7375 113.1C39.8697 113.318 40.0406 113.492 40.2502 113.619C40.4644 113.742 40.7196 113.804 41.0158 113.804C41.3895 113.804 41.6971 113.722 41.9387 113.558C42.1802 113.394 42.3693 113.173 42.5061 112.895C42.6473 112.612 42.743 112.298 42.7932 111.951V110.714C42.7658 110.445 42.7089 110.194 42.6223 109.962C42.5402 109.729 42.4286 109.527 42.2873 109.354C42.146 109.176 41.9706 109.039 41.7609 108.943C41.5559 108.843 41.312 108.793 41.0295 108.793C40.7287 108.793 40.4735 108.857 40.2639 108.984C40.0542 109.112 39.8811 109.287 39.7443 109.511C39.6122 109.734 39.5142 109.994 39.4504 110.29C39.3866 110.586 39.3547 110.903 39.3547 111.24ZM53.7529 113.517V109.989C53.7529 109.725 53.7051 109.497 53.6094 109.306C53.5137 109.114 53.3678 108.966 53.1719 108.861C52.9805 108.757 52.7389 108.704 52.4473 108.704C52.1784 108.704 51.946 108.75 51.75 108.841C51.554 108.932 51.4014 109.055 51.292 109.21C51.1826 109.365 51.1279 109.54 51.1279 109.736H49.4873C49.4873 109.445 49.5579 109.162 49.6992 108.889C49.8405 108.615 50.0456 108.371 50.3145 108.157C50.5833 107.943 50.9046 107.774 51.2783 107.651C51.652 107.528 52.0713 107.467 52.5361 107.467C53.0921 107.467 53.5843 107.56 54.0127 107.747C54.4456 107.934 54.7852 108.216 55.0312 108.595C55.2819 108.968 55.4072 109.438 55.4072 110.003V113.291C55.4072 113.628 55.43 113.931 55.4756 114.2C55.5257 114.465 55.5964 114.695 55.6875 114.891V115H53.999C53.9215 114.822 53.86 114.597 53.8145 114.323C53.7734 114.045 53.7529 113.776 53.7529 113.517ZM53.9922 110.502L54.0059 111.521H52.8232C52.5179 111.521 52.249 111.55 52.0166 111.609C51.7842 111.664 51.5905 111.746 51.4355 111.855C51.2806 111.965 51.1644 112.097 51.0869 112.252C51.0094 112.407 50.9707 112.582 50.9707 112.778C50.9707 112.974 51.0163 113.154 51.1074 113.318C51.1986 113.478 51.3307 113.603 51.5039 113.694C51.6816 113.785 51.8958 113.831 52.1465 113.831C52.4837 113.831 52.7777 113.763 53.0283 113.626C53.2835 113.485 53.484 113.314 53.6299 113.113C53.7757 112.908 53.8532 112.715 53.8623 112.532L54.3955 113.264C54.3408 113.451 54.2474 113.651 54.1152 113.865C53.9831 114.079 53.8099 114.285 53.5957 114.48C53.3861 114.672 53.1331 114.829 52.8369 114.952C52.5452 115.075 52.208 115.137 51.8252 115.137C51.3421 115.137 50.9115 115.041 50.5332 114.85C50.1549 114.654 49.8587 114.392 49.6445 114.063C49.4303 113.731 49.3232 113.355 49.3232 112.936C49.3232 112.544 49.3962 112.197 49.542 111.896C49.6924 111.591 49.9111 111.336 50.1982 111.131C50.4899 110.926 50.8454 110.771 51.2646 110.666C51.6839 110.557 52.1624 110.502 52.7002 110.502H53.9922ZM62.4705 109.025V117.844H60.823V107.604H62.3406L62.4705 109.025ZM67.2898 111.233V111.377C67.2898 111.915 67.226 112.414 67.0984 112.874C66.9754 113.33 66.7908 113.729 66.5447 114.07C66.3032 114.408 66.0047 114.67 65.6492 114.856C65.2937 115.043 64.8836 115.137 64.4187 115.137C63.9585 115.137 63.5551 115.052 63.2088 114.884C62.867 114.711 62.5776 114.467 62.3406 114.152C62.1036 113.838 61.9122 113.469 61.7664 113.045C61.6251 112.617 61.5249 112.147 61.4656 111.637V111.083C61.5249 110.541 61.6251 110.049 61.7664 109.606C61.9122 109.164 62.1036 108.784 62.3406 108.465C62.5776 108.146 62.867 107.9 63.2088 107.727C63.5506 107.553 63.9493 107.467 64.4051 107.467C64.8699 107.467 65.2824 107.558 65.6424 107.74C66.0024 107.918 66.3055 108.173 66.5516 108.506C66.7977 108.834 66.9822 109.23 67.1053 109.695C67.2283 110.156 67.2898 110.668 67.2898 111.233ZM65.6424 111.377V111.233C65.6424 110.892 65.6105 110.575 65.5467 110.283C65.4829 109.987 65.3826 109.727 65.2459 109.504C65.1092 109.281 64.9337 109.107 64.7195 108.984C64.5099 108.857 64.257 108.793 63.9607 108.793C63.6691 108.793 63.4184 108.843 63.2088 108.943C62.9992 109.039 62.8237 109.174 62.6824 109.347C62.5411 109.52 62.4318 109.723 62.3543 109.955C62.2768 110.183 62.2221 110.431 62.1902 110.7V112.026C62.2449 112.354 62.3383 112.655 62.4705 112.929C62.6027 113.202 62.7895 113.421 63.0311 113.585C63.2771 113.744 63.5916 113.824 63.9744 113.824C64.2706 113.824 64.5236 113.76 64.7332 113.633C64.9428 113.505 65.1137 113.33 65.2459 113.106C65.3826 112.879 65.4829 112.617 65.5467 112.32C65.6105 112.024 65.6424 111.71 65.6424 111.377ZM72.052 115.137C71.5051 115.137 71.0106 115.048 70.5686 114.87C70.1311 114.688 69.7574 114.435 69.4475 114.111C69.1421 113.788 68.9074 113.407 68.7434 112.97C68.5793 112.532 68.4973 112.061 68.4973 111.555V111.281C68.4973 110.702 68.5816 110.178 68.7502 109.709C68.9188 109.24 69.1535 108.839 69.4543 108.506C69.7551 108.169 70.1105 107.911 70.5207 107.733C70.9309 107.556 71.3752 107.467 71.8537 107.467C72.3824 107.467 72.8449 107.556 73.2414 107.733C73.6379 107.911 73.966 108.162 74.2258 108.485C74.4901 108.804 74.6861 109.185 74.8137 109.627C74.9458 110.069 75.0119 110.557 75.0119 111.09V111.794H69.2971V110.611H73.385V110.481C73.3758 110.185 73.3166 109.907 73.2072 109.647C73.1024 109.388 72.9406 109.178 72.7219 109.019C72.5031 108.859 72.2115 108.779 71.8469 108.779C71.5734 108.779 71.3296 108.839 71.1154 108.957C70.9058 109.071 70.7303 109.237 70.5891 109.456C70.4478 109.675 70.3384 109.939 70.2609 110.249C70.188 110.554 70.1516 110.898 70.1516 111.281V111.555C70.1516 111.878 70.1949 112.179 70.2814 112.457C70.3726 112.73 70.5048 112.97 70.6779 113.175C70.8511 113.38 71.0607 113.542 71.3068 113.66C71.5529 113.774 71.8332 113.831 72.1477 113.831C72.5441 113.831 72.8973 113.751 73.2072 113.592C73.5171 113.432 73.786 113.207 74.0139 112.915L74.882 113.756C74.7225 113.988 74.5152 114.212 74.26 114.426C74.0048 114.635 73.6926 114.806 73.3234 114.938C72.9589 115.071 72.535 115.137 72.052 115.137ZM79.7877 107.604V108.807H75.6178V107.604H79.7877ZM76.8209 105.792H78.4684V112.956C78.4684 113.184 78.5003 113.359 78.5641 113.482C78.6324 113.601 78.7258 113.681 78.8443 113.722C78.9628 113.763 79.1018 113.783 79.2613 113.783C79.3753 113.783 79.4846 113.776 79.5895 113.763C79.6943 113.749 79.7786 113.735 79.8424 113.722L79.8492 114.979C79.7125 115.021 79.553 115.057 79.3707 115.089C79.193 115.121 78.9879 115.137 78.7555 115.137C78.3772 115.137 78.0423 115.071 77.7506 114.938C77.4589 114.802 77.2311 114.581 77.067 114.275C76.9029 113.97 76.8209 113.564 76.8209 113.059V105.792Z" fill="#EAF8F2"/>
</svg>

    </svg>
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
