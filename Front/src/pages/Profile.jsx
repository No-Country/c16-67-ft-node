import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useModalContext } from '../context/modalContext';
import Modal from '../components/Modal';
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

  const onChange = (event) => {
    if (event.target.value === 'Agregar mascota') {
      openModal({
        petModal: true
      });
    } else {
      axios.get(`${API_URL_BASE}/api/v1/pet/${event.target.value}`).then((res) => {
        const pet = { petId: res.data.petId, name: res.data.name, image_url: res.data.image_url };
        localStorage.setItem('pet', JSON.stringify(pet));
      });
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {modalState.isOpen && <Modal />}
      <div className="px-4">
        <div className="flex flex-col items-center gap-y-4 mt-4">
          {!user.image_url ? (
            <></>
          ) : (
            <img src={user.image_url} alt="User image" className="w-12 h-12 rounded-full" />
          )}
          <p>{user.name}</p>
        </div>
        {options.length === 0 ? (
          <></>
        ) : (
          <section>
            <h2 className="mt-12">Mascotas</h2>
            <select name="select" onChange={onChange} className="w-full">
              <option>Agregar mascota</option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  selected={pet !== null && option.value === pet.petId}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </section>
        )}
      </div>
    </>
  );
}
