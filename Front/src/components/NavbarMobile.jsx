import { NavLink } from 'react-router-dom';
import feedIcon from '../assets/images/feedIcon.svg';
import logo from '../assets/images/isologo.svg';
import chatIcon from '../assets/images/chat.svg';
export default function NavbarMobile({ active, pet }) {
  console.log(active);
  return (
    <div className="block md:hidden">
      {active !== 'profile' && (
        <>
          <div className="fixed w-full bg-white">
            <div className="h-16 px-4 flex justify-between items-center">
              <img
                className="h-12 w-12 rounded-full border-2 border-slate-200 object-cover"
                src={pet !== null ? pet.image_url : ''}
                alt="image of active pet"
              />
              <img src={logo} className="left-0 h-12" alt="logo" />
              <div className="w-12 flex justify-end">
                <img src={chatIcon} alt="chat icon" className="h-6 w-6" />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="fixed w-full bottom-0 flex z-30 shadow-lg">
        <div className="bg-white flex-grow relative">
          <div className="bg-white absolute h-20 w-12 right-[-40px]"></div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 0 360 89" fill="none">
          <path
            d="M0 0H90H125.424C131.479 0 137.208 2.74302 141.004 7.45987L152.42 21.6431C167.979 40.9744 197.782 39.8111 211.788 19.3259L219.044 8.71242C222.771 3.2604 228.95 0 235.554 0H270H360V65C360 78.2548 349.255 89 336 89H24C10.7452 89 0 78.2548 0 65V0Z"
            fill="#ffffff"
          />
        </svg>
        <div className="bg-white flex-grow relative">
          <div className="bg-white absolute h-20 w-12 left-[-40px]"></div>
        </div>
      </div>
      <nav className="fixed bottom-0 z-50 w-full h-20">
        <ul className="flex relative h-full">
          <li className={`flex-grow flex-col flex-basis-0 flex h-full items-center justify-center`}>
            <NavLink
              to={'/'}
              className={`grid place-items-center ${active === 'feed' && 'bg-primary-300 py-1 px-2 rounded-lg'}`}
            >
              <img className="h-6 w-6" src={feedIcon} alt="Feed icon" />
              <span>Feed</span>
            </NavLink>
          </li>
          <li className="flex-grow-[2] flex flex-col flex-basis-0 h-full items-center justify-center">
            <span className="material-symbols-outlined">search</span>
            Search
          </li>
          <li className="absolute right-1/2 translate-x-1/2 top-[-28px] p-0 w-12 h-12 bg-accent-300 rounded-full grid place-items-center shadow-lg">
            <NavLink className="grid place-items-center" to={'/publication-create'}>
              <span className="material-symbols-outlined text-4xl text-white">add</span>
            </NavLink>
          </li>
          <li className="flex-grow-[2] flex-col flex-basis-0 flex h-full items-center justify-center">
            <NavLink
              to={'/profile'}
              className={`grid place-items-center ${active === 'profile' && 'bg-primary-300 py-1 px-2 rounded-lg'}`}
            >
              <span className="material-symbols-outlined">pets</span>
              Profile
            </NavLink>
          </li>
          <li className={`flex-grow flex-basis-0 flex h-full items-center justify-center`}>
            <NavLink
              to={'/menu'}
              className={`grid place-items-center ${active === 'menu' && 'bg-primary-300 py-1 px-2 rounded-lg'}`}
            >
              <span className="material-symbols-outlined">settings</span>
              More
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
