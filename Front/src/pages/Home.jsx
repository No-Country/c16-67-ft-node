import React, { useEffect, useState } from 'react';
import HomeTab from './../components/HomeTab';
import PetContainer from '../components/Feed/PetContainer';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router';
import axios from 'axios';
const ServerConnect = `${import.meta.env.VITE_SERVER_PRODUCTION}`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId === null) {
      navigate('/login');
    } else {
      setIsLoading(true);

      axios
        .get(`${ServerConnect}/api/v1/pet/userid/${JSON.parse(userId)}`)
        .then((res) => {
          if (res.data.length === 0) {
            navigate('/pets-create');
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [navigate]);

  return (
    <>
      {isLoading && <Spinner />}
      <HomeTab />
      <div className="fixed bg-slate-800 rounded-full text-white text-center mr-4 w-16 h-16 right-4 bottom-24 z-50">
        <span className="material-symbols-outlined text-2xl">filter_alt</span>
        <p className="text-sm">Filter</p>
      </div>
      <PetContainer />
    </>
  );
}
