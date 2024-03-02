import { useEffect } from 'react';
import Logout from '../components/authentication/Logout';
import { useNavigateContext } from '../context/navigationContext';
import ConfiguracionPage from '../service/settings/Settings';

export default function Menu() {
  const { setActive } = useNavigateContext();

  useEffect(() => {
    setActive('menu');
  }, []);
  return (
    <main className="grid place-items-center min-h-screen">
      <ConfiguracionPage/>
    </main>
  );
}
