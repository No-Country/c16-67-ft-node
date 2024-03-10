import React from 'react';
import styles from './dropdownMenu.module.css';
import { Dropdown } from 'flowbite-react';
import { BiTrash, BiCog, BiEdit } from 'react-icons/bi';
import dropDown from '../../../assets/images/dropDown.png';

const DropDownMenu = ({ userIdDelete, deletePublication }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return (
    <>
      <Dropdown
        className={styles.dropdown}
        dismissOnClick={false}
        renderTrigger={() => (
          <img src={dropDown} alt="drop-down" className="cursor-pointer w-[20px] md:w-[23px]" />
        )}
      >
        {userId === userIdDelete ? (
          <>
            <Dropdown.Item
              title={'Delete'}
              className={styles.errorItem}
              onClick={() => deletePublication()}
            >
              <BiTrash />
            </Dropdown.Item>
            <Dropdown.Item title={'Edit'} className={styles.editItem}>
              <BiEdit />
            </Dropdown.Item>
            <Dropdown.Item title={'Details'} className={styles.detailsItem}>
              <BiCog />
            </Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item title={'Details'} className={styles.detailsItem}>
            <BiCog />
          </Dropdown.Item>
        )}
      </Dropdown>
    </>
  );
};

export default DropDownMenu;
