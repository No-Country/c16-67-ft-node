import React, { useEffect, useState } from 'react';
import HomeTab from './../components/HomeTab';
import PetContainer from '../components/Feed/PetContainer';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Suggestions from '../components/Suggestions';
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
    <main className="pb-20 md:pb-0 pt-16 md:pt-0 xl:flex">
      {isLoading && <Spinner />}
      <div className="md:flex-grow xl:flex-grow-[3] xl:basis-0">
        <HomeTab />
        <PetContainer />
      </div>
      <Suggestions />
    </main>
  );
}
