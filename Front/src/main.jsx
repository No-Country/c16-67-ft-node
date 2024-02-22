import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css';
import './output.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NavigateProvider } from './context/navigationContext';
import { ModalProvider } from './context/modalContext';
import { UserProvider } from './context/userContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NavigateProvider>
    <ModalProvider>
      <UserProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_USER_ID}>
          <App />
        </GoogleOAuthProvider>
      </UserProvider>
    </ModalProvider>
  </NavigateProvider>
);
