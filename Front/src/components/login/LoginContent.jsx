import { useEffect, React } from 'react';
import { gapi } from 'gapi-script';
import LoginButton from '../account-google/Login';
import { useModalContext } from '../../context/modalContext';
import Modal from '../Modal';

function IndexLogin() {
  const { modalState, openModal } = useModalContext();
  const clientId = `${import.meta.env.VITE_USER_ID}`;

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: clientId,
          scope: ''
        })
        .catch(() => {
          openModal({
            description: 'An error has occurred',
            chooseModal: false,
            error: true
          });
        });
    }
    gapi.load('client:auth2', start);
  }, [clientId]);

  return (
    <>
      {modalState.isOpen && <Modal />}
      <div className="ModalLogin">
        <div className="modalLoginGradient">
          <div className="modalLoginContainer">
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexLogin;
