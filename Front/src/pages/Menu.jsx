import { useEffect } from 'react';
import Logout from '../components/authentication/Logout';
import { useNavigateContext } from '../context/navigationContext';

export default function Menu() {
  const { setActive } = useNavigateContext();

  useEffect(() => {
    setActive('menu');
  }, []);
  return (
    <main className="grid place-items-center min-h-screen">
      <Logout />
    </main>
  );
}
