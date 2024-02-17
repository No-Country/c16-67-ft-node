import React from 'react';
import logo from '../../public/assets/images/isologo.svg';
import styles from './HomeTab.module.css';

export default function HomeTab({ tabActive, setTabActive }) {
  return (
    <div>
      <img src={logo} className="w-full hidden md:block xl:hidden h-12" alt="logo" />
      <div className="flex h-12 md:h-16 md:text-xl fixed md:static w-full bg-white">
        <div
          className={`${styles.tab} ${tabActive === 'Feed' ? `${styles.active}` : `${styles.inactive}`}`}
          onClick={() => setTabActive('Feed')}
        >
          Feed
        </div>
        <div
          className={`${styles.tab} ${tabActive === 'Lost-Adption' ? `${styles.active}` : `${styles.inactive}`}`}
          onClick={() => setTabActive('Lost-Adption')}
        >
          Lost/In adoption
        </div>
      </div>
    </div>
  );
}
