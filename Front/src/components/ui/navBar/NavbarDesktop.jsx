import chatIcon from '../../../assets/images/chat.svg';
import notificationsIcon from '../../../assets/images/notifications.svg';
import defaultProfile from '../../../assets/images/defaultProfile.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NavbarDesktop.module.css';
import Modal from '../modal/Modal';
import { useModalContext } from '../../../context/modalContext';
import Logout from '../../authentication/Logout';
import FeedIcon from '../../../assets/components/FeedIcon';
import SearchIcon from '../../../assets/components/SearchIcon';
import FootIcon from '../../../assets/components/FootIcon';
import SaveIcon from '../../../assets/components/SaveIcon';
import SettingsIcon from '../../../assets/components/SettingsIcon';

export default function NavbarDesktop({ active, pet }) {
  const navigate = useNavigate();
  const { modalChooseState } = useModalContext();

  return (
    <>
      {modalChooseState.isOpen && <Modal />}
      {active !== 'createFirstPet' && (
        <div
          className={`hidden md:block absolute left-0 ml-4 lg:ml-8 pt-4 min-h-screen md:w-52 lg:w-64 border-r border-neutral-300 ${styles.desktop}`}
        >
          <div
            className="ml-4 flex items-center gap-x-4 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            {pet !== null ? (
              <>
                <img
                  className="md:h-12 md:w-12 rounded-full border-2 border-slate-200 object-cover cursor-pointer"
                  src={pet.image_url !== '' ? pet.image_url : defaultProfile}
                  alt="image of active pet"
                />
                <div>
                  <p className="text-headline-sm">{pet.name}</p>
                  <p className="text-body-lg">@{pet.username}</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <ul className="mt-8">
            <li className={`${active === 'feed' ? `${styles.active}` : ''}`}>
              <NavLink to={'/'}>
                <FeedIcon fill={`${active === 'feed' ? '#fff' : '#000'}`} />
                <p className={`${active === 'feed' && `${styles.activeText}`}`}>Feed</p>
              </NavLink>
            </li>
            <li className={`${active === 'search' ? `${styles.active}` : ''}`}>
              <NavLink to={'/search'}>
                <SearchIcon fill={`${active === 'search' ? '#fff' : '#000'}`} />
                <p className={`${active === 'search' && `${styles.activeText}`}`}>Search</p>
              </NavLink>
            </li>
            <li className={`${active === 'profile' ? `${styles.active}` : ''}`}>
              <NavLink to={'/profile'}>
                <FootIcon fill={`${active === 'profile' ? '#fff' : '#000'}`} />
                <p className={`${active === 'profile' && `${styles.activeText}`}`}>Profile</p>
              </NavLink>
            </li>
            <li className={`${active === 'chat' ? `${styles.active}` : ''}`}>
              <NavLink>
                <img src={chatIcon} alt="chat icon" className={`${styles.navImg}`} />
                <p className={`${active === 'chat' && `${styles.activeText}`}`}>Chat</p>
              </NavLink>
            </li>
            <div className="border-b border-neutral-300" />
            <h2 className="sm:text-title-md md:text-title-lg px-6 py-3">Menu</h2>
            <li className={`${active === 'notifications' ? `${styles.active}` : ''}`}>
              <NavLink className="">
                <img
                  src={notificationsIcon}
                  className={`${styles.navImg}`}
                  alt="Notification icon"
                />
                <p className={`${active === 'notifications' && `${styles.activeText}`}`}>
                  Notifications
                </p>
              </NavLink>
            </li>
            <li className={`${active === 'saved' ? `${styles.active}` : ''}`}>
              <NavLink to="/saved">
                <SaveIcon fill={`${active === 'saved' ? '#fff' : '#000'}`} />
                <p className={`${active === 'saved' && `${styles.activeText}`}`}>Saved</p>
              </NavLink>
            </li>
            <li className={`${active === 'settings' ? `${styles.active}` : ''}`}>
              <NavLink to="/menu/settings">
                {/* <img src={settingsIcon} className={`${styles.navImg}`} alt="Settings icon" /> */}
                <SettingsIcon fill={`${active === 'settings' ? '#fff' : '#000'}`} />
                <p className={`${active === 'settings' && `${styles.activeText}`}`}>Settings</p>
              </NavLink>
            </li>
            <div className="border-b border-neutral-300 mt-4" />
            <li className="mt-4">
              <Logout />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
