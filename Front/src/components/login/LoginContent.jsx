import { useEffect, React } from 'react';
import { gapi } from 'gapi-script';
import LoginButton from '../account-google/Login';
import LogoutButton from '../account-google/Logout';

function IndexLogin() {
  const clientId = `${import.meta.env.VITE_USER_ID}`;

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: clientId,
          scope: ''
        })
        .catch((error) => {
          console.error('Error con gapi:', error);
        });
    }
    gapi.load('client:auth2', start);
  }, [clientId]);

  return (
    <div className="ModalLogin">
      <div className="modalLoginGradient">
        <div className="modalLoginContainer">
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default IndexLogin;
