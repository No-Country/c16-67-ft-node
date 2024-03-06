import { NavLink } from 'react-router-dom';
import feedIcon from '../../../assets/images/feedIcon.svg';
import searchIcon from '../../../assets/images/search.svg';
import footIcon from '../../../assets/images/footIcon.svg';
import menuIcon from '../../../assets/images/menu.svg';
import logo from '../../../assets/images/isologo2.svg';
import chatIcon from '../../../assets/images/chat.svg';
import ModalPost from '../../Feed/createPublication/ModalPost';
import { useState } from 'react';
export default function NavbarMobile({ active, pet }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {active !== 'createFirstPet' && (
        <div className="block md:hidden">
          {active === 'feed' && (
            <>
              <div className="fixed w-full bg-white z-50">
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
              <li className={`flex-grow flex-col flex-basis-0 flex items-center justify-center`}>
                <NavLink to={'/'} className={`grid place-items-center w-auto px-2 py-1`}>
                  <img
                    className={`h-6 w-10 ${active === 'feed' && 'bg-primary-700 rounded-lg'}`}
                    src={feedIcon}
                    alt="Feed icon"
                  />
                  <span>Feed</span>
                </NavLink>
              </li>
              <li className="flex-grow-[2] flex flex-col flex-basis-0 h-full items-center justify-center">
                <NavLink className={`grid place-items-center px-2 py-1}`} to={'/search'}>
                  <img
                    className={`h-6 w-10 ${active === 'search' && 'bg-primary-700 rounded-lg'}`}
                    src={searchIcon}
                    alt="Search icon"
                  />
                  Search
                </NavLink>
              </li>
              <li className="absolute right-1/2 translate-x-1/2 top-[-32px] p-0 w-16 h-16 bg-accent-500 rounded-full grid place-items-center shadow-lg">
                <NavLink className="grid place-items-center" onClick={() => handleOpenModal()}>
                  <span className="material-symbols-outlined text-2xl text-black">add</span>
                  <p>Post</p>
                </NavLink>
              </li>
              <li className="flex-grow-[2] flex-col flex-basis-0 flex h-full items-center justify-center">
                <NavLink to={'/profile'} className={`grid place-items-center px-2 py-1'}`}>
                  <img
                    className={`h-6 w-10 ${active === 'profile' && 'bg-primary-700 rounded-lg'}`}
                    src={footIcon}
                    alt="Profile icon"
                  />
                  Profile
                </NavLink>
              </li>
              <li className={`flex-grow flex-basis-0 flex h-full items-center justify-center`}>
                <NavLink to={'/menu'} className={`grid place-items-center px-2 py-1`}>
                  <img
                    className={`h-6 w-10 ${active === 'menu' && 'bg-primary-700 rounded-lg'}`}
                    src={menuIcon}
                    alt="Menu icon"
                  />
                  More
                </NavLink>
              </li>
            </ul>
          </nav>
          {isModalOpen && <ModalPost closeModal={handleCloseModal} />}
        </div>
      )}
    </>
  );
}
