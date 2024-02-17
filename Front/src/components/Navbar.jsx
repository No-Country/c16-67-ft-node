import { useNavigateContext } from '../context/navigationContext';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

export default function Navbar() {
  const { active, setActive } = useNavigateContext();
  const pet = JSON.parse(localStorage.getItem('pet'));
  return (
    <>
      <NavbarMobile active={active} pet={pet} setActive={setActive} />
      <NavbarDesktop active={active} pet={pet} setActive={setActive} />
    </>
  );
}
