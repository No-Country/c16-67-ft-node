import React, { useEffect } from 'react';
import HomeTab from './../components/HomeTab';
import PetContainer from './../components/PetContainer';
import { useNavigate } from 'react-router';
import axios from 'axios';
const ServerConnect = `${import.meta.env.VITE_APP_ID}`;

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId === null) {
      navigate('/login');
    }
    axios.get(`${ServerConnect}/api/v1/pet/userid/${JSON.parse(userId)}`).then((res) => {
      if (res.data.length === 0) {
        navigate('/pets-create');
      }
    });
  }, []);

  return (
    <>
      <HomeTab />
      <div className="fixed bg-slate-800 rounded-full text-white text-center mr-4 w-16 h-16 right-4 bottom-24 z-50">
        <span className="material-symbols-outlined text-2xl">filter_alt</span>
        <p className="text-sm">Filter</p>
      </div>
      <PetContainer />
    </>
  );
}
