import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router';

export default function Logout() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    googleLogout();
    localStorage.removeItem('userId');
    localStorage.removeItem('pet');
    navigate('/login');
  };
  return (
    <>
      <button className="bg-slate-500 p-2 rounded-md text-white" onClick={() => handleOnClick()}>
        Cerrar sesión
      </button>
    </>
  );
}
