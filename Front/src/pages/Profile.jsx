import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useModalContext } from '../context/modalContext';
import Modal from '../components/Modal';
import { useUserContext } from '../context/userContext';
import { useNavigateContext } from '../context/navigationContext';
import { MdEdit } from 'react-icons/md';

const API_URL_BASE = import.meta.env.VITE_SERVER_PRODUCTION;

export default function Profile() {
  const navigate = useNavigate();
  const { modalState, openModal } = useModalContext();
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [publications, setPublications] = useState([]);
  const [user, setUser] = useState({ name: '', image_url: '' });
  const { getPet, setActivePet } = useUserContext();
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { petId } = JSON.parse(localStorage.getItem('pet'));
  const pet = getPet();
  const { setActive } = useNavigateContext();

  setActive('profile');

  useEffect(() => {
    fetchData();
  }, [userId, navigate]);

  useEffect(() => {
    // Nuevo useEffect para actualizar las publicaciones cuando cambie pet.petId
    const fetchPublications = async () => {
      if (!pet.petId) return; // Verifica que pet.petId exista
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL_BASE}/api/v1/publication/petid/${pet.petId}`);
        setPublications(response.data.data);
      } catch (error) {
        openModal({
          description: 'An error has occurred while fetching publications',
          chooseModal: false,
          error: true
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, [pet.petId]); // Este efecto depende de pet.petId

  //FUNCIONES
  const fetchData = async () => {
    setIsLoading(true);
    if (userId === null) {
      navigate('/login');
      return;
    }
    try {
      const [petsResponse, userResponse, publicationsResponse] = await Promise.all([
        axios.get(`${API_URL_BASE}/api/v1/pet/userid/${userId}`),
        axios.get(`${API_URL_BASE}/api/v1/user/${userId}`),
        axios.get(`${API_URL_BASE}/api/v1/publication/petid/${petId}`)
      ]);

      setOptions(
        petsResponse.data.data
          .filter((pet) => pet.status)
          .map((pet) => ({
            value: pet.petId,
            label: pet.name,
            description: pet.description,
            image: pet.image_url
          }))
      );
      setPublications(publicationsResponse.data.data);
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

  const onSelectPet = (e) => {
    if (e.target.value === 'addPet') {
      openModal({
        petModal: true,
        xBtnPetModal: true
      });
    } else {
      axios
        .get(`${API_URL_BASE}/api/v1/pet/${e.target.value}`)
        .then((res) => {
          console.log(res.data);
          const { data } = res;
          const pet = {
            petId: data.data.petId,
            name: data.data.name,
            description: data.data.description,
            image_url: data.data.image_url
          };
          axios
            .get(`${API_URL_BASE}/api/v1/publication/petid/${pet.petId}`)
            .then((res) => {
              console.log(res.data);

              const { data } = res;
              const petWithPublications = {
                ...pet,
                publications: data.data.image_url
              };
              setActivePet(petWithPublications);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <main className="p-0">
      {isLoading && <Spinner />}
      {modalState.isOpen && <Modal />}
      <div className="px-4">
        <div className="flex flex-col items-center gap-y-4 mt-4">
          <div className="flex justify-between items-center w-full text-[28px]">
            {options.length === 0 ? (
              <></>
            ) : (
              <section>
                <select
                  name="select"
                  onChange={onSelectPet}
                  className="w-full h-[32px] border-[1px] border-[#E9D0BD] rounded-[8px] text-[16px] outline-none"
                >
                  {options.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      selected={pet !== null && option.value === pet.petId}
                      className="text-[16px]  "
                    >
                      @{option.label}
                    </option>
                  ))}
                  <option value={'addPet'} className="text-[16px] ">
                    Add pet
                  </option>
                </select>
              </section>
            )}
            {!user.image_url ? (
              <></>
            ) : (
              <img
                src={user.image_url}
                alt="User image"
                className="w-[35px] h-[35px] rounded-full"
              />
            )}
          </div>
          <MdEdit className="cursor-pointer" />
        </div>
        <section className="flex flex-col items-center justify-center ">
          <img
            src={pet.image_url}
            alt="Pet-image"
            className="w-[90px] h-[90px] rounded-full object-cover"
          />
          <p className="text-[24px] mt-1 mb-4 text-[#232220]">{pet.name}</p>
          <div className="flex justify-center w-[50%] text-[#176543] text-[16px] font-black">
            <p className="text-center border-r-[1px] border-[#176543] mr-3 pr-3">1000 Followers</p>
            <p className="text-center">500 Following</p>
          </div>
          <p className="mt-4 text-[16px]">{pet.description}</p>
          <div className="flex flex-wrap gap-4">
            {publications.map((publication, index) => (
              <img
                key={index}
                src={publication.image_url}
                alt={`Publication-${index}`}
                className="w-[150px] h-[150px] object-cover rounded-md"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
