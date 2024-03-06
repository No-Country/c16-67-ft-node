import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import { useModalContext } from '../../context/modalContext';
import { useUserContext } from '../../context/userContext';
import logoutIcon from '../../assets/images/logout.svg';

export default function Logout() {
  const { openModal, closeModal } = useModalContext();
  const navigate = useNavigate();
  const { logoutContext } = useUserContext();

  const handleOnClick = () => {
    openModal({
      title: 'Exit',
      description: 'Are you sure you want to leave?',
      confirmBtn: 'Yes',
      denyBtn: 'No',
      onClick: async () => {
        googleLogout();
        navigate('/');
        await logoutContext();
        closeModal();
      },
      chooseModal: true
    });
  };

  return (
    <>
      <div className="flex gap-x-2 cursor-pointer items-center w-full" onClick={handleOnClick}>
        <img src={logoutIcon} className="sm:w-6 sm:h-6 md:w-[30px] md:h-[30px]" alt="Logout icon" />
        <p>Logout</p>
      </div>
    </>
  );
}
