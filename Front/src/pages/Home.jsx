import React, { useEffect, useState } from 'react';
import Spinner from '../components/ui/Spinner';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Suggestions from '../components/Feed/Suggestions';
import { useModalContext } from '../context/modalContext';
import Modal from '../components/ui/modal/Modal';
import { useNavigateContext } from '../context/navigationContext';
import PetContainer from '../components/Feed/petContainer/PetContainer';
import HomeTab from '../components/Feed/homeTab/HomeTab';
const ServerConnect = `${import.meta.env.VITE_SERVER_PRODUCTION}`;

export default function Home() {
  const navigate = useNavigate();
  const { modalState, openModal } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [tabActive, setTabActive] = useState('Feed');
  const userId = localStorage.getItem('userId');
  const { setActive } = useNavigateContext();

  setActive('feed');

  useEffect(() => {
    if (userId === null) {
      navigate('/login');
    } else {
      setIsLoading(true);
      axios
        .get(`${ServerConnect}/api/v1/pet/userid/${JSON.parse(userId)}`)
        .then((res) => {
          if (res.data.data.length === 0) {
            navigate('/profile');
            openModal({
              petModal: true
            });
          }
          setIsLoading(false);
        })
        .catch(() => {
          openModal({
            description: 'An error has occurred',
            chooseModal: false,
            error: true
          });
          setIsLoading(false);
        });
    }
  }, [navigate]);

  return (
    <main className="xl:flex">
      {isLoading && <Spinner />}
      <div className="md:flex-grow xl:flex-grow-[3] xl:basis-0 text-body">
        {modalState.isOpen && <Modal />}
        <HomeTab tabActive={tabActive} setTabActive={setTabActive} />
        <PetContainer tabActive={tabActive} />
      </div>
      <Suggestions />
    </main>
  );
}
