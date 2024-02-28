import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/ui/navBar/Navbar';
import React from 'react';
import PublicationForm from './pages/PublicationForm';
import Profile from './pages/Profiles/Profile';
import PetProfile from './pages/Profiles/PetProfile';
import Menu from './pages/Menu';
import { useUserContext } from './context/userContext';
import Saved from './pages/Saved';
import { Search } from './pages/Search';
import Suggestions from './components/ui/navBar/suggestions/Suggestions';
import Footer from './components/ui/navBar/Footer';

export default function App() {
  // Get userId from useUserContext
  const userIdLS = localStorage.getItem('userId');
  const { userId } = useUserContext();

  return (
    <>
      {userIdLS !== null || userId !== '' ? (
        <BrowserRouter>
          <Navbar />
          <div className="md:pl-56 lg:pl-72 pb-20 md:pb-0 pt-16 md:pt-0 xl:flex">
            <div className="md:flex-grow xl:flex-grow-[3] xl:basis-0 text-body-md">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/publication-create" element={<PublicationForm />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/profile/:id" element={<PetProfile />} />
                <Route exact path="/menu" element={<Menu />} />
                <Route exact path="/saved" element={<Saved />} />
                <Route exact path="/search" element={<Search />} />
              </Routes>
            </div>
            <div className="hidden xl:flex xl:p-4 xl:pt-2 xl:flex-grow xl:basis-0 min-h-screen border-l border-neutral-300 flex-col justify-between gap-y-4">
              <Suggestions />
              <Footer />
            </div>
          </div>
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
