import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import { useModalContext } from '../../context/modalContext';
import PetModal from '../../components/ui/modal/PetModal';
import { useNavigateContext } from '../../context/navigationContext';
import { getPetById } from '../../service/pets/petService';
import { getUserById } from '../../service/users/userService';
import { getPublicationsByPetId } from '../../service/publications/publicationsService';
import FollowButton from '../../components/ui/FollowButton';
import noPostCat from '../../assets/images/noPostCat.png';

export default function PetProfile() {
  const navigate = useNavigate();

  //CONTEXTOS
  const { modalTextState, openModal } = useModalContext();
  const { setActive } = useNavigateContext();

  //ESTADOS LOCALES
  const [isLoading, setIsLoading] = useState(false);
  const [pets, setPets] = useState([]);
  const [publications, setPublications] = useState([]);
  const [user, setUser] = useState({ name: '', image_url: '' });
  const userId = JSON.parse(localStorage.getItem('userId'));
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    setActive('profile');
  }, [id, navigate]);

  //FUNCIONES
  const fetchData = async () => {
    setIsLoading(true);
    if (id === null) {
      navigate('/login');
      return;
    }

    try {
      const [petResponse, userResponse, publicationsResponse] = await Promise.all([
        getPetById(id),
        getUserById(userId),
        getPublicationsByPetId(id)
      ]);

      setPets(petResponse.data.data);
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

  return (
    <main className="pt-0">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {modalTextState.isOpen && <PetModal />}
          <div className="px-4">
            <div className="flex flex-col items-center gap-y-4 pt-4 md:pt-0">
              <div className="flex justify-between items-center w-full text-[28px] md:hidden">
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
              <section className="flex flex-col items-center justify-center mt-5 w-full ">
                <div className="flex justify-center items-center w-full gap-x-6">
                  <div className="flex-1"></div>
                  <img
                    src={pets.image_url}
                    alt="Pet-image"
                    className="w-[100px] h-[100px] mb-3 rounded-full shadow-lg object-cover"
                  />
                  <div className=" flex-1">
                    <FollowButton />
                  </div>
                </div>
                <p className=" mt-1 mb-2 text-[24px] text-[#232220] text-center lg:text-[26px]">
                  {pets.name}
                </p>
                <p className="mb-2 text-body-md text-[#232220] text-center lg:text-body-lg">
                  @{pets.username}
                </p>
                <p className="mb-2 text-body-md text-[#232220B2] text-center md:mt-1 lg:text-body-lg">
                  {pets.age} years
                </p>
                <div className="flex justify-center w-[200px] text-[#176543] font-black ">
                  <p className="text-center text-[14px] md:text-[16px] border-r-[1px] border-[#176543] mr-3 pr-3">
                    1000 Followers
                  </p>
                  <p className="text-center text-[14px] md:text-[16px]">500 Following</p>
                </div>
                <p className="mt-4 text-[16px]">{pets.description}</p>
                <div className="flex flex-col items-center mt-8 w-full">
                  {publications.length === 0 ? (
                    <section className="flex flex-col items-center justify-center p-4">
                      <img src={noPostCat} alt="sad-cat" className="w-40 h-40 md:w-60 md:h-60" />
                      <div className="flex items-center text-title-md mt-2 md:text-title-lg">
                        You don´t have any posts yet.
                      </div>
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
