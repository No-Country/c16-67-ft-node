import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useModalContext } from '../context/modalContext';
import Modal from '../components/Modal';
import PetCard from '../components/Feed/PetCard';
import { FiArrowLeft } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export default function Profile() {
  const { modalState, openModal } = useModalContext();
  const [options, setOptions] = useState([]);
  const [user, setUser] = useState({ name: '', image_url: '' });
  const userId = JSON.parse(localStorage.getItem('userId'));
  const pet = JSON.parse(localStorage.getItem('pet'));
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (userId === null) {
        navigate('/login');
        return;
      }

      try {
        const [petsResponse, userResponse] = await Promise.all([
          axios.get(`${API_URL_BASE}/api/v1/pet/userid/${userId}`),
          axios.get(`${API_URL_BASE}/api/v1/user/${userId}`)
        ]);

        setOptions(
          petsResponse.data
            .filter((pet) => pet.status)
            .map((pet) => ({ value: pet.petId, label: pet.name }))
        );
        setUser(userResponse.data);
      } catch (error) {
        openModal({
          description: 'An error has occurred',
          chooseModal: false
        });
      }
      setIsLoading(false);
    };
    fetchData();
  }, [userId, navigate]);

  const onChange = (petId) => {
    if (petId === 'addPet') {
      openModal({
        petModal: true,
        xBtnPetModal: true
      });
    } else {
      axios.get(`${API_URL_BASE}/api/v1/pet/${petId}`).then((res) => {
        const pet = { petId: res.data.petId, name: res.data.name, image_url: res.data.image_url };
        localStorage.setItem('pet', JSON.stringify(pet));
      });
    }
  };

  return (
    <main>
      {isLoading && <Spinner />}
      {modalState.isOpen && <Modal />}
      <div className="px-4">
        <div className="flex flex-col items-center gap-y-4 mt-4">
          <div className="flex justify-between items-center w-full text-[28px]">
            <FiArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
            <span>Profile</span>
            <MdEdit className="cursor-pointer" />
          </div>
          {!user.image_url ? (
            <></>
          ) : (
            <img src={user.image_url} alt="User image" className="w-[90px] h-[90px] rounded-full" />
          )}
          <p className="font-semibold">{user.mail}</p>
        </div>
        {options.length === 0 ? (
          <></>
        ) : (
          <section className="flex flex-wrap gap-4">
            {options.map((option) => (
              <PetCard
                petCardProfile={true}
                key={option.value}
                pet={option}
                isSelected={pet !== null && option.value === pet.petId}
                onClick={onChange}
              />
            ))}
            <PetCard
              petCardProfile={true}
              key="addPet"
              pet={{ value: 'addPet', label: 'Agregar mascota' }}
              isSelected={false}
              onClick={onChange}
            />
          </section>
        )}
      </div>
    </main>
  );
}
