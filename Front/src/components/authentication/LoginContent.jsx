import { useEffect, React } from 'react';
import { gapi } from 'gapi-script';
import LoginButton from './Login';
import { useModalContext } from '../../context/modalContext';
import Modal from '../ui/modal/Modal';

function IndexLogin() {
  const { openModal } = useModalContext();
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
            error: true
          });
        });
    }
    gapi.load('client:auth2', start);
  }, [clientId]);

  return (
    <>
      <Modal />
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
