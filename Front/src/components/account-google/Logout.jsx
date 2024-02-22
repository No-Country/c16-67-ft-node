import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import { useModalContext } from '../../context/modalContext';
import Modal from '../../components/Modal';
import { useUserContext } from '../../context/userContext';

export default function Logout() {
  const { openModal, modalState, closeModal } = useModalContext();
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
      {modalState.isOpen && <Modal />}
      <button
        className="bg-slate-500 px-8 py-[8px] text-[16px] rounded-md text-white"
        onClick={() => handleOnClick()}
      >
        Exit
      </button>
    </>
  );
}
