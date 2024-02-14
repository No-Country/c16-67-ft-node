import React from 'react';
import ReactDOM from 'react-dom/client';
import PetsForm from './pages/PetsForm';
import './output.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/pets-create" element={<PetsForm />} />
      </Routes>
    </BrowserRouter>
  </div>
);
