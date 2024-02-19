import feedIcon from '../assets/images/feedIcon.png';
import chatIcon from '../assets/images/chat.png';
import { NavLink } from 'react-router-dom';
import styles from './NavbarDesktop.module.css';

export default function NavbarDesktop({ active, setActive, pet }) {
  return (
    <div className={`hidden md:block fixed left-0 ml-4 mt-4 md-32 lg:w-64 ${styles.desktop}`}>
      <div className="ml-4 flex items-center gap-x-4">
        {pet !== null ? (
          <>
            <img
              className="md:h-12 md:w-12 lg:h-24 lg:w-24 rounded-full border-2 border-slate-200"
              src={pet.image_url}
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
          <NavLink onClick={() => setActive('feed')} to={'/'}>
            <img src={feedIcon} className={`${styles.navImg}`} alt="Feed icon" />
            <p>Feed</p>
          </NavLink>
        </li>
        <li className={`${active === 'search' ? `${styles.active}` : ''}`}>
          <NavLink>
            <span className="material-symbols-outlined">search</span>
            <p>Search</p>
          </NavLink>
        </li>
        <li className={`${active === 'profile' ? `${styles.active}` : ''}`}>
          <NavLink onClick={() => setActive('profile')} to={'/profile'}>
            <span className="material-symbols-outlined">pets</span>
            <p>Profile</p>
          </NavLink>
        </li>
        <li className={`${active === 'notifications' ? `${styles.active}` : ''}`}>
          <NavLink className="">
            <span className="material-symbols-outlined">notifications</span>
            <p>Notifications</p>
          </NavLink>
        </li>
        <li className={`${active === 'chat' ? `${styles.active}` : ''}`}>
          <NavLink>
            <img src={chatIcon} alt="chat icon" className={`${styles.navImg}`} />
            <p>Chat</p>
          </NavLink>
        </li>
        <li className={`${active === 'settigns' ? `${styles.active}` : ''}`}>
          <NavLink onClick={() => setActive('settigns')} to={'/settings'}>
            <span className="material-symbols-outlined">settings</span>
            <p>Settings</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
