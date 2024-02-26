import { useNavigateContext } from '../../../context/navigationContext';
import { useUserContext } from '../../../context/userContext';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

export default function Navbar() {
  const { getPet } = useUserContext();
  const { active, setActive } = useNavigateContext();
  const pet = getPet();

  return (
    <>
      <NavbarMobile active={active} pet={pet} setActive={setActive} />
      <NavbarDesktop active={active} pet={pet} setActive={setActive} />
    </>
  );
}
