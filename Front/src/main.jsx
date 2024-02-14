import React from 'react';
import ReactDOM from 'react-dom/client';
import './input.css';
import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Index from './pages/Index';
import Navbar from './components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';

console.log(import.meta.env.VITE_USER_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_USER_ID}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
