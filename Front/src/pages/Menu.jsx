import { useEffect } from 'react';
import Logout from '../components/authentication/Logout';
import { useNavigateContext } from '../context/navigationContext';
import ConfiguracionPage from '../components/settings/Settings';

export default function Menu() {
  const { setActive } = useNavigateContext();

  useEffect(() => {
    setActive('menu');
  }, []);
  return (
    <main className="bg-gray-100 min-h-screen">
      <ConfiguracionPage/>
    </main>
  );
}
