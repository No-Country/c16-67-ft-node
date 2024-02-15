import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useNavigateContext } from '../../context/navigationContext';

//const clientId = `${import.meta.env.VITE_USER_ID}`;
const ServerConnect = `${import.meta.env.VITE_SERVER_PRODUCTION}`;

const Login = () => {
  const { setActive } = useNavigateContext();
  const navigate = useNavigate();
  const onSuccess = (res) => {
    const { credential: token } = res;

    axios
      .post(`${ServerConnect}/api/v1/user`, { token: token })
      .then((response) => {
        console.log('Solicitud enviada con éxito:', response.data);
        const userId = response.data.data[0].id;
        localStorage.setItem('userId', JSON.stringify(userId));
        axios.get(`${ServerConnect}/api/v1/pet/userid/${userId}`).then((res) => {
          if (res.data.length > 0) {
            setActive('feed');
            navigate('/');
          } else {
            navigate('/pets-create');
          }
        });
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
  };

  const onFailure = (res) => {
    console.log('LOGIN FAILED! res: ', res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
    </div>
  );
};

export default Login;
