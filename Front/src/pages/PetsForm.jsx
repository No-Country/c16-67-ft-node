import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import Spinner from '../components/Spinner';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PetsForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const userId = JSON.parse(localStorage.getItem('userId'));

    const payload = new FormData();
    payload.append('name', name);
    payload.append('age', age);
    payload.append('address', address);
    payload.append('description', description);
    payload.append('image', profilePhoto);
    payload.append('userId', userId);

    const handleRegistration = async () => {
      setIsLoading(false);
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_PRODUCTION}/api/v1/pet`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        navigate('/');
      } catch (err) {
        console.error(err);
        throw new Error();
      }
    };

    if (!file) {
      console.log('no estas subiendo foto pa'); //Hay que hacer un modal
    } else {
      handleRegistration();
    }
    setIsLoading(true);
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

  return (
    <>
      {isLoading && <Spinner />}
      <main>
        <section className="bg-slate-100 h-[100vh]">
          <form className="p-6 min-h-[650px] h-[780px] overflow-y-scroll" onSubmit={onSubmit}>
            <div className="relative w-[100px] h-[100px] rounded-[50px] shadow-md m-auto mt-0 mb-3 bg-white">
              <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <span
                className="flex justify-center items-center absolute w-full h-full bg-[#0000] rounded-[50%] text-[0] text-center cursor-pointer hover:bg-[#0004] hover:transition-all hover:duration-[0.4s] hover:ease-in-out hover:text-2xl"
                onClick={handleUploadButtonClick}
              >
                <FiEdit />
              </span>
              <img
                src={'/src/assets/images/defaultProfile.jpg'}
                className="w-full h-full rounded-[50%] object-cover"
                id="profilePhoto"
              />
            </div>
            <TextInput
              labelName={'Name'}
              input={'input'}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextInput
              labelName={'Age'}
              input={'input'}
              val={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <TextInput
              labelName={'Address'}
              input={'input'}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <TextInput
              labelName={'Description'}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button className="block p-2 mt-5 mx-auto text-white bg-gray-500 rounded-md">
              Add Pet
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default PetsForm;
