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

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_USER_ID}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/pets-create" element={<PetsForm />} />
        <Route exact path="/publication-create" element={<PublicationForm />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
