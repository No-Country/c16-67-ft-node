import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import { useModalContext } from '../../context/modalContext';
import PetModal from '../../components/ui/modal/PetModal';
import { useUserContext } from '../../context/userContext';
import { useNavigateContext } from '../../context/navigationContext';
import { MdEdit } from 'react-icons/md';
import Select from 'react-select';
import Modal from '../../components/ui/modal/Modal';
import { getPetById, getPetsByUserId } from '../../service/pets/petService';
import { getUserById } from '../../service/users/userService';
import { getPublicationsByPetId } from '../../service/publications/publicationsService';

export default function Profile() {
  //INSTANCIAS
  const navigate = useNavigate();

  //CONTEXTOS
  const { modalTextState, petModalState, openModal } = useModalContext();
  const { getPet, setActivePet } = useUserContext();
  const { setActive } = useNavigateContext();
  const pet = getPet();

  //ESTADOS LOCALES
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [publications, setPublications] = useState([]);
  const [user, setUser] = useState({ name: '', image_url: '' });

  //LOCAL STORAGE
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { petId } = JSON.parse(localStorage.getItem('pet'));

  useEffect(() => {
    fetchData();
    setActive('profile');
  }, [userId, navigate, petId]);

  //FUNCIONES
  const fetchData = async () => {
    setIsLoading(true);
    if (userId === null) {
      navigate('/login');
      return;
    }
    try {
      const [petsResponse, userResponse, publicationsResponse] = await Promise.all([
        getPetsByUserId(userId),
        getUserById(userId),
        getPublicationsByPetId(petId)
      ]);

      setOptions(
        petsResponse.data
          .filter((pet) => pet.status)
          .map((pet) => ({
            value: pet.petId,
            label: pet.name,
            description: pet.description,
            image: pet.image_url
          }))
      );
      setPublications(publicationsResponse.data);
      setUser(userResponse.data);
    } catch (error) {
      openModal({
        description: 'An error has occurred',
        chooseModal: false,
        error: true
      });
    }
    setIsLoading(false);
  };

  const onSelectPet = async (event) => {
    if (event.value === 'addPet') {
      openModal({
        petModal: true,
        xBtnPetModal: true
      });
    } else {
      const { data } = await getPetById(event.value);
      const pet = {
        petId: data.data.petId,
        name: data.data.name,
        username: data.data.username,
        description: data.data.description,
        image_url: data.data.image_url
      };

      const publications = await getPublicationsByPetId(petId);
      const petWithPublications = {
        ...pet,
        publications: publications.data.image_url
      };
      console.log(data);
      setActivePet(petWithPublications);
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
          {petModalState.isOpen && <PetModal />}
          {modalTextState.isOpen && <Modal />}
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
                {user && user.image_url ? (
  <img
    src={user.image_url}
    alt="User image"
    className="w-[35px] h-[35px] rounded-full xl:hidden"
  />
) : (
  <></>
)}

              </div>
            </div>
            <div className="xl:flex">
              <section className="flex flex-col items-center justify-center mt-5 w-full ">
                <div className="absolute flex flex-row-reverse left-0 right-6 top-[60px] text-[24px] md:text-[35px] md:top-[20px] xl:right-[350px]">
                  <MdEdit onClick={() => navigate('/edit/profile')} className="cursor-pointer" />
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
                    <div className="grid grid-cols-2 gap-4 mb-[120px] justify-center lg:grid-cols-3">
                      {publications.map((publication, index) => (
                        <div key={index} className="flex shadow-md rounded-[8px] overflow-hidden">
                          <div className="flex-1 relative hover:opacity-100">
                            <img
                              src={publication.image_url}
                              alt={`Publication-${index}`}
                              className="w-[160px] h-[160px] object-cover rounded-md shadow-lg md:w-[204px] md:h-[224px] lg:w-[224px] lg:h-[244px]"
                            />
                            <div className="flex shadow-md rounded-[8px] overflow-hidden hover:opacity-100">
                              <p className="flex items-center justify-center h-[100%] absolute px-1 m-0 left-0 right-0 bottom-0 text-center text-[14px] md:text-[16px] bg-[#0000078d] text-white opacity-0 hover:opacity-100 hover:transition-all hover:duration-[0.5s] hover:ease-in-out ">
                                {publication.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
