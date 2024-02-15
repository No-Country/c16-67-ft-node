import { React, useEffect } from 'react';
import LoginContent from '../components/login/LoginContent';
import { useNavigateContext } from '../context/navigationContext';

export default function Login() {
  const { setActive } = useNavigateContext();
  useEffect(() => {
    setActive('login');
  }, []);

  return (
    <div className="min-h-screen grid place-items-center">
      <LoginContent />
    </div>
  );
}
