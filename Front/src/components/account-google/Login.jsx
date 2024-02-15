import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//const clientId = `${import.meta.env.VITE_USER_ID}`;
const ServerConnect = `${import.meta.env.VITE_APP_ID}`;

const Login = () => {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    const { credential: token } = res;

    axios
      .post(`${ServerConnect}/api/v1/user`, { token: token })
      .then((response) => {
        console.log('Solicitud enviada con éxito:', response.data);
        const userId = response.data.data[0].id;
        localStorage.setItem('userId', JSON.stringify(userId));
        const pets = axios.get(`${ServerConnect}/api/v1/pet/userid/${userId}`);

        if (pets.length > 0) {
          navigate('/');
        } else {
          navigate('/pets-create');
        }
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
