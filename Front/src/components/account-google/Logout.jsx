import { googleLogout } from '@react-oauth/google';

const handleOnClick = () => {
  googleLogout();
  localStorage.removeItem('userId');
  console.log('Se cerro sesión');
};

const Logout = () => <button onClick={() => handleOnClick()}>Logout</button>;

export default Logout;
