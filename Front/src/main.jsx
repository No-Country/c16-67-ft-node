import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css';
import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PetsForm from './pages/PetsForm';
import PublicationForm from './pages/PublicationForm';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import { NavigateProvider } from './context/navigationContext';
import { ModalProvider } from './context/modalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NavigateProvider>
    <ModalProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_USER_ID}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/pets-create" element={<PetsForm />} />
            <Route exact path="/publication-create" element={<PublicationForm />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/settings" element={<Menu />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ModalProvider>
  </NavigateProvider>
);
