import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useNavigateContext } from '../../context/navigationContext';
import { useModalContext } from '../../context/modalContext';
import { useUserContext } from '../../context/userContext';
import Modal from '../ui/modal/Modal';

//const clientId = `${import.meta.env.VITE_USER_ID}`;
const ServerConnect = `${import.meta.env.VITE_SERVER_PRODUCTION}`;

const Login = () => {
  const { setActive } = useNavigateContext();
  const { openModal, modalTextState } = useModalContext();
  const { loginContext } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = (res) => {
    const { credential: token } = res;
    setIsLoading(false);
    axios
      .post(`${ServerConnect}/api/v1/user`, { token: token })
      .then(async (response) => {
        console.log('Solicitud enviada con éxito:', response.data);
        const { userId, last_pet } = response.data.data;
        await loginContext(userId, last_pet);

        axios.get(`${ServerConnect}/api/v1/pet/userid/${userId}`).then((res) => {
          if (res.data.data.length > 0) {
            setActive('feed');
            openModal({
              description: 'Login successful',
              chooseModal: false,
              error: false
            });
            navigate('/');
          } else {
            navigate('/create-first-pet');
          }
        });
      })
      .catch(() => {
        openModal({
          description: 'An error has occurred',
          chooseModal: false,
          error: true
        });
      });
    setIsLoading(true);
  };

  const onFailure = () => {
    openModal({
      description: 'An error has occurred',
      chooseModal: false,
      error: true
    });
  };

  return (
    <>
      {isLoading && <Spinner />}
      {modalTextState.isOpen && <Modal />}
      <div id="signInButton">
        <GoogleLogin
          text="signin_with"
          width="300px"
          shape="rectangular"
          theme="filled_black"
          locale="english"
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </div>
    </>
  );
};

export default Login;
