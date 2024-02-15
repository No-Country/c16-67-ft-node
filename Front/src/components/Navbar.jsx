import { NavLink } from 'react-router-dom';
import { useNavigateContext } from '../context/navigationContext';

export default function Navbar() {
  const { active, setActive } = useNavigateContext();
  return (
    <>
      {active !== 'login' ? (
        <nav className="fixed bottom-0 z-50 bg-white border-t-2 border-slate-200 w-full h-20">
          <ul className="flex relative h-full">
            <li
              className={`flex-grow flex-basis-0 flex h-full items-center justify-center ${active === 'feed' ? 'text-blue-500' : ''}`}
            >
              <NavLink to={'/'} onClick={() => setActive('feed')}>
                <span>Feed</span>
              </NavLink>
            </li>
            <li
              className={`flex-grow flex-basis-0 flex h-full items-center justify-center ${active === 'search' ? 'text-blue-500' : ''}`}
            >
              Search
            </li>
            <li className="absolute right-1/2 translate-x-1/2 top-[-28px] p-2 bg-white rounded-full border-t-2 border-slate-200">
              <NavLink to={'/publication-create'} onClick={() => setActive('publication-create')}>
                <span className="material-symbols-outlined text-4xl">add</span>
              </NavLink>
            </li>
            <li
              className={`flex-grow flex-basis-0 flex h-full items-center justify-center ${active === 'profile' ? 'text-blue-500' : ''}`}
            >
              <NavLink to={'/profile'} onClick={() => setActive('profile')}>
                Profile
              </NavLink>
            </li>
            <li
              className={`flex-grow flex-basis-0 flex h-full items-center justify-center ${active === 'menu' ? 'text-blue-500' : ''}`}
            >
              <NavLink to={'/menu'} onClick={() => setActive('menu')}>
                More
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}
