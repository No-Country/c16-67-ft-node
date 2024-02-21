import Logout from '../components/account-google/Logout';
import { useNavigateContext } from '../context/navigationContext';

export default function Menu() {
  const { setActive } = useNavigateContext();

  setActive('menu');
  return (
    <main className="grid place-items-center min-h-screen">
      <Logout />
    </main>
  );
}
