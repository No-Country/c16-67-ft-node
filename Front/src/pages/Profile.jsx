import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useModalContext } from '../context/modalContext';
import Modal from '../components/Modal';
import { useUserContext } from '../context/userContext';
import { useNavigateContext } from '../context/navigationContext';
import Suggestions from '../components/Suggestions';
import { MdEdit } from 'react-icons/md';
import Select from 'react-select';

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
    const fetchPublications = async () => {
      if (!pet.petId) return;
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
  }, [pet.petId]);

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
    if (e.value === 'addPet') {
      openModal({
        petModal: true,
        xBtnPetModal: true
      });
    } else {
      axios
        .get(`${API_URL_BASE}/api/v1/pet/${e.value}`)
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

  const customStylesSelect = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      height: '32px',
      borderRadius: '8px 8px 5px 5px',
      border: '1px solid #E9D0BD',
      boxShadow: 'none',
      outline: 'none',
      fontSize: '16px',
      '&:hover': {
        backgroundColor: '#F3F4F6',
        borderRadius: '8px 8px 5px 5px'
      },
      '@media (min-width: 768px)': {
        border: 'none',
        borderRadius: '0',
        fontSize: '15px'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      width: '100%',
      backgroundColor: state.isSelected ? '#c9b4a4' : '#F8F0EA',
      fontSize: '16px',
      fontWeight: '600',
      color: '#000',
      '&:hover': {
        backgroundColor: state.isSelected ? '#c39f84' : '#ddcbbd',
        color: '#FFFFFF'
      }
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '0',
      border: 'none',
      backgroundColor: '#F3F4F6',
      borderRadius: '0 0 8px 8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }),
    menuList: (provided) => ({
      ...provided,
      paddingBottom: '0',
      paddingTop: '2px',
      backgroundColor: '#B8682A'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#2D3748',
      padding: '2px 8px'
    }),
    singleValue: (provided) => ({
      ...provided,
      padding: '0'
    })
  };

  return (
    <main className="pt-0">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {modalState.isOpen && <Modal />}
          <div className="px-4">
            <div className="flex flex-col items-center gap-y-4 pt-4 md:pt-0">
              <div className="flex justify-between items-center w-full text-[28px] md:hidden">
                {options.length === 0 ? (
                  <></>
                ) : (
                  <section>
                    <Select
                      options={[...options, { value: 'addPet', label: 'Add pet' }]}
                      onChange={(selectedOption) => onSelectPet(selectedOption)}
                      value={options.find(
                        (option) =>
                          option.value === pet.petId ||
                          options.find((option) => option.value === 'addPet')
                      )}
                      getOptionLabel={(option) =>
                        option.value === 'addPet' ? option.label : `@${option.label}`
                      }
                      styles={customStylesSelect}
                    />
                  </section>
                )}
                {!user.image_url ? (
                  <></>
                ) : (
                  <img
                    src={user.image_url}
                    alt="User image"
                    className="w-[35px] h-[35px] rounded-full xl:hidden"
                  />
                )}
              </div>
            </div>
            <div className="xl:flex">
              <section className="flex flex-col items-center justify-center mt-5 xl:w-[75%] w-full ">
                <div className="absolute flex flex-row-reverse left-0 right-6 top-[60px] text-[24px] md:text-[35px] md:top-[20px] xl:right-[350px]">
                  <MdEdit className="cursor-pointer" />
                </div>
                <img
                  src={pet.image_url}
                  alt="Pet-image"
                  className="w-[100px] h-[100px] mb-3 rounded-full shadow-lg object-cover"
                />
                <p className=" mt-1 mb-2 text-[24px] text-[#232220] text-center md:mb-0 lg:text-[26px]">
                  {pet.name}
                </p>
                {options.length === 0 ? (
                  <></>
                ) : (
                  <section className="hidden md:block md:mb-4 md:mt-2">
                    <Select
                      options={[...options, { value: 'addPet', label: 'Add pet' }]}
                      onChange={(selectedOption) => onSelectPet(selectedOption)}
                      value={options.find(
                        (option) =>
                          option.value === pet.petId ||
                          options.find((option) => option.value === 'addPet')
                      )}
                      getOptionLabel={(option) =>
                        option.value === 'addPet' ? option.label : `@${option.label}`
                      }
                      styles={customStylesSelect}
                    />
                  </section>
                )}
                <div className="flex justify-center w-[200px] text-[#176543] font-black ">
                  <p className="text-center text-[14px] md:text-[16px] border-r-[1px] border-[#176543] mr-3 pr-3">
                    1000 Followers
                  </p>
                  <p className="text-center text-[14px] md:text-[16px]">500 Following</p>
                </div>
                <p className="mt-4 text-[16px]">{pet.description}</p>
                <div className="flex flex-col items-center mt-8 w-full">
                  {publications.length === 0 ? (
                    <section className="flex justify-center h-[200px] p-4 shadow-lg bg-[#fafafa] font-semibold">
                      <div className="flex items-center">There´s no publication yet</div>
                    </section>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 mb-[120px] lg:grid-cols-3">
                      {publications.map((publication, index) => (
                        <img
                          key={index}
                          src={publication.image_url}
                          alt={`Publication-${index}`}
                          className="w-[160px] h-[160px] object-cover rounded-md shadow-lg md:w-[204px] md:h-[224px] lg:w-[224px] lg:h-[244px]"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
              <Suggestions className="xl:ml-auto" />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
