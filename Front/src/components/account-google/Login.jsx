import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { useNavigateContext } from '../../context/navigationContext';
import { useModalContext } from '../../context/modalContext';
import Modal from '../Modal';

//const clientId = `${import.meta.env.VITE_USER_ID}`;
const ServerConnect = `${import.meta.env.VITE_SERVER_PRODUCTION}`;

const Login = () => {
  const { setActive } = useNavigateContext();
  const { openModal, modalState } = useModalContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = (res) => {
    const { credential: token } = res;
    setIsLoading(false);
    axios
      .post(`${ServerConnect}/api/v1/user`, { token: token })
      .then((response) => {
        console.log('Solicitud enviada con éxito:', response.data);
        const userId = response.data.data.userId;
        localStorage.setItem('userId', JSON.stringify(userId));
        axios.get(`${ServerConnect}/api/v1/pet/userid/${userId}`).then((res) => {
          if (res.data.data.length > 0) {
            setActive('feed');
            openModal({
              description: 'Login successful',
              chooseModal: false
            });
            navigate('/');
          } else {
            openModal({
              petModal: true
            });
            navigate('/profile');
          }
        });
      })
      .catch(() => {
        openModal({
          description: 'An error has ocurred',
          chooseModal: false
        });
      });
    setIsLoading(true);
  };

  const onFailure = () => {
    openModal({
      description: 'An error has ocurred',
      chooseModal: false
    });
  };

  return (
    <>
      {isLoading && <Spinner />}
      {modalState.isOpen && <Modal />}
      <div id="signInButton">
        <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
      </div>
    </>
  );
};

export default Login;
