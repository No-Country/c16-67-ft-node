import GoogleLogin from "react-google-login";
import axios from "axios";

const clientId = `${import.meta.env.VITE_USER_ID}`;
const ServerConnect = `${import.meta.env.VITE_SERVER_CONNECT}`;

const Login = () => {

    const onSuccess = (res) => {
        const { email, imageUrl, name } = res.profileObj;

        const formatUser = {
            name,
            mail: email,
            image_url: imageUrl,
        };

        console.log("LOGIN SUCCESS! Current user: ", formatUser);
        
        axios.post(`${ServerConnect}/api/v1/user`, formatUser)
            .then(response => {
                console.log('Solicitud enviada con éxito:', response.data);
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
            });
      
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return (
        <div id="signInButton">
            <GoogleLogin 
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );

}

export default Login;