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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPet, setSelectedPet] = useState(() => {
    const storedPet = localStorage.getItem('pet');
    return storedPet ? JSON.parse(storedPet) : null;
  });

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
          petsResponse.data.data
            .filter((pet) => pet.status)
            .map((pet) => ({ value: pet.petId, label: pet.name, image: pet.image_url }))
        );
        setUser(userResponse.data.data);
      } catch (error) {
        openModal({
          description: 'An error has occurred',
          chooseModal: false,
          error: true
        });
      }
      setIsLoading(false);
    };
    fetchData();
  }, [userId, navigate]);

  const onCardClick = (pet) => {
    if (pet.value === 'addPet') {
      openModal({
        petModal: true,
        xBtnPetModal: true
      });
    } else {
      axios
        .get(`${API_URL_BASE}/api/v1/pet/${pet.value}`)
        .then((res) => {
          const { data } = res;
          const petData = {
            petId: data.data.petId,
            name: data.data.name,
            image_url: data.data.image_url
          };
          localStorage.setItem('pet', JSON.stringify(petData));
          setSelectedPet(petData);
        })
        .catch(() => {
          openModal({
            description: 'An error has occurred',
            chooseModal: false,
            error: true
          });
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
          <p className="font-semibold mb-3">{user.mail}</p>
        </div>
        {options.length === 0 ? (
          <section className="flex justify-center flex-wrap gap-4">
            <PetCard
              petCardProfileDefault={true}
              isSelected={selectedPet !== null && selectedPet.value === 'addPet'}
              onClick={() => onCardClick({ value: 'addPet' })}
            />
          </section>
        ) : (
          <section className="flex justify-center flex-wrap gap-4">
            {options.map((option) => (
              <PetCard
                petCardProfile={true}
                key={option.value}
                petImg={option.image}
                petName={option.label}
                isSelected={selectedPet !== null && option.value === selectedPet.petId}
                onClick={() => onCardClick(option)}
              />
            ))}
            <PetCard
              petCardProfileDefault={true}
              isSelected={selectedPet !== null && selectedPet.value === 'addPet'}
              onClick={() => onCardClick({ value: 'addPet' })}
            />
          </section>
        )}
      </div>
    </main>
  );
}
