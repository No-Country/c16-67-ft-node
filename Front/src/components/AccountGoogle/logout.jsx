import GoogleLogout from "react-google-login";

const clientId = `${import.meta.env.VITE_USER_ID}`;

const Logout = () => {

    const onSuccess = () => {
        console.log("log out successFull")
    }

    return (
        <div id="signOutButton">
            <GoogleLogout 
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    );

}

export default Logout;