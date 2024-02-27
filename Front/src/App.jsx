import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/ui/navBar/Navbar';
import React from 'react';
import PublicationForm from './pages/PublicationForm';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import { useUserContext } from './context/userContext';
import { Search } from './pages/Search';

export default function App() {
  // Get userId from useUserContext
  const userIdLS = localStorage.getItem('userId');
  const { userId } = useUserContext();

  return (
    <>
      {userIdLS !== null || userId !== '' ? (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/publication-create" element={<PublicationForm />} />
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}
