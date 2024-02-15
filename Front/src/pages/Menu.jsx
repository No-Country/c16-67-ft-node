import React, { useEffect } from 'react';
import Logout from '../components/account-google/Logout';
import { useNavigate } from 'react-router';

export default function Menu() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === null) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="grid place-items-center min-h-screen">
      <Logout />
    </div>
  );
}
