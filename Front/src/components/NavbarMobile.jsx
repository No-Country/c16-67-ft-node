import { NavLink } from 'react-router-dom';
import feedIcon from '../assets/images/feedIcon.png';
import logo from '../assets/images/isologo.svg';
import chatIcon from '../assets/images/chat.png';

export default function NavbarMobile({ active, setActive, pet }) {
  return (
    <>
      {active !== 'login' ? (
        <div className="block md:hidden">
          <div className="fixed w-full bg-white">
            <div className="h-16 px-4 flex justify-between items-center">
              <img
                className="h-14 w-14 rounded-full border-2 border-slate-200"
                src={pet !== null ? pet.image_url : ''}
                alt="image of active pet"
              />
              <img src={logo} className="absolute w-full left-0 h-12" alt="logo" />
              <div className="flex gap-x-1">
                <span className="material-symbols-outlined">notifications</span>
                <img src={chatIcon} alt="chat icon" className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="fixed w-full bottom-0 flex z-30 shadow-lg">
            <div className="bg-primary-300 flex-grow relative">
              <div className="bg-primary-300 absolute h-20 w-12 right-[-40px]"></div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 0 360 89" fill="none">
              <path
                d="M0 0H90H125.424C131.479 0 137.208 2.74302 141.004 7.45987L152.42 21.6431C167.979 40.9744 197.782 39.8111 211.788 19.3259L219.044 8.71242C222.771 3.2604 228.95 0 235.554 0H270H360V65C360 78.2548 349.255 89 336 89H24C10.7452 89 0 78.2548 0 65V0Z"
                fill="#4E9745"
              />
            </svg>
            <div className="bg-primary-300 flex-grow relative">
              <div className="bg-primary-300 absolute h-20 w-12 left-[-40px]"></div>
            </div>
          </div>
          <nav className="fixed bottom-0 z-50 w-full h-20">
            <ul className="flex relative h-full">
              <li
                className={`flex-grow flex-basis-0 flex h-full items-center justify-center text-primary-500 ${active === 'feed' ? 'text-black' : ''}`}
              >
                <NavLink
                  to={'/'}
                  onClick={() => setActive('feed')}
                  className="grid place-items-center"
                >
                  <img className="h-6 w-6" src={feedIcon} alt="Feed icon" />
                  <span>Feed</span>
                </NavLink>
              </li>
              <li
                className={`flex-grow-[2] flex-col flex-basis-0 flex h-full items-center justify-center text-primary-500 ${active === 'search' ? 'text-black' : ''}`}
              >
                <span className="material-symbols-outlined">search</span>
                Search
              </li>
              <li className="absolute right-1/2 translate-x-1/2 top-[-28px] p-0 w-12 h-12 bg-accent-300 rounded-full grid place-items-center shadow-lg">
                <NavLink
                  className="grid place-items-center"
                  to={'/publication-create'}
                  onClick={() => setActive('publication-create')}
                >
                  <span className="material-symbols-outlined text-4xl text-white">add</span>
                </NavLink>
              </li>
              <li
                className={`flex-grow-[2] flex-basis-0 flex h-full items-center justify-center text-primary-500 ${active === 'profile' ? 'text-black' : ''}`}
              >
                <NavLink
                  to={'/profile'}
                  onClick={() => setActive('profile')}
                  className="flex flex-col items-center"
                >
                  <span className="material-symbols-outlined">pets</span>
                  Profile
                </NavLink>
              </li>
              <li
                className={`flex-grow flex-basis-0 flex h-full items-center justify-center text-primary-500 ${active === 'settings' ? 'text-black' : ''}`}
              >
                <NavLink
                  to={'/menu'}
                  onClick={() => setActive('settings')}
                  className="flex flex-col items-center"
                >
                  <span className="material-symbols-outlined">settings</span>
                  More
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
