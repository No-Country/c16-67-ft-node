import feedIcon from '../assets/images/feedIcon.svg';
import chatIcon from '../assets/images/chat.svg';
import searchIcon from '../assets/images/search.svg';
import footIcon from '../assets/images/footIcon.svg';
import notificationsIcon from '../assets/images/notifications.svg';
import saveIcon from '../assets/images/save.svg';
import settingsIcon from '../assets/images/settings.svg';
import defaultProfile from '../assets/images/defaultProfile.jpg';
import { NavLink } from 'react-router-dom';
import styles from './NavbarDesktop.module.css';

export default function NavbarDesktop({ active, pet }) {
  return (
    <div
      className={`hidden md:block absolute left-0 ml-4 mt-4 md:w-52 lg:w-64 pr-2 ${styles.desktop}`}
    >
      <div className="ml-4 flex items-center gap-x-4">
        {pet !== null ? (
          <>
            <img
              className="md:h-12 md:w-12 lg:h-24 lg:w-24 rounded-full border-2 border-slate-200 object-cover"
              src={pet.image_url !== '' ? pet.image_url : defaultProfile}
              alt="image of active pet"
            />
            <div>
              <p>{pet.name}</p>
              <p>@{pet.name}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <ul className="mt-8">
        <li className={`${active === 'feed' ? `${styles.active}` : ''}`}>
          <NavLink to={'/'}>
            <img src={feedIcon} className={`${styles.navImg}`} alt="Feed icon" />
            <p className={`${active === 'feed' && `${styles.activeText}`}`}>Feed</p>
          </NavLink>
        </li>
        <li className={`${active === 'search' ? `${styles.active}` : ''}`}>
          <NavLink>
            <img src={searchIcon} className={`${styles.navImg}`} alt="Search icon" />
            <p className={`${active === 'search' && `${styles.activeText}`}`}>Search</p>
          </NavLink>
        </li>
        <li className={`${active === 'profile' ? `${styles.active}` : ''}`}>
          <NavLink to={'/profile'}>
            <img src={footIcon} className={`${styles.navImg}`} alt="Profile icon" />
            <p className={`${active === 'profile' && `${styles.activeText}`}`}>Profile</p>
          </NavLink>
        </li>
        <li className={`${active === 'chat' ? `${styles.active}` : ''}`}>
          <NavLink>
            <img src={chatIcon} alt="chat icon" className={`${styles.navImg}`} />
            <p className={`${active === 'chat' && `${styles.activeText}`}`}>Chat</p>
          </NavLink>
        </li>
        <div className="border-b border-black opacity-25" />
        <h2 className="sm:text-title-md md:text-title-lg px-6 py-3">Menu</h2>
        <li className={`${active === 'notifications' ? `${styles.active}` : ''}`}>
          <NavLink className="">
            <img src={notificationsIcon} className={`${styles.navImg}`} alt="Notification icon" />
            <p className={`${active === 'notifications' && `${styles.activeText}`}`}>
              Notifications
            </p>
          </NavLink>
        </li>
        <li className={`${active === 'saved' ? `${styles.active}` : ''}`}>
          <NavLink className="">
            <img src={saveIcon} className={`${styles.navImg}`} alt="Saved icon" />
            <p className={`${active === 'saved' && `${styles.activeText}`}`}>Saved</p>
          </NavLink>
        </li>
        <li className={`${active === 'menu' ? `${styles.active}` : ''}`}>
          <NavLink to={'/menu'}>
            <img src={settingsIcon} className={`${styles.navImg}`} alt="Settings icon" />
            <p className={`${active === 'menu' && `${styles.activeText}`}`}>Settings</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
