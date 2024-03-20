import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/ui/navBar/Navbar';
import React from 'react';
import Profile from './pages/Profiles/Profile';
import PetProfile from './pages/Profiles/PetProfile';
import Menu from './pages/Menu';
import { useUserContext } from './context/userContext';
import Saved from './pages/Saved';
import { Search } from './pages/Search';
import { ProfileEdit } from './pages/Profiles/ProfileEdit';
import Suggestions from './components/ui/navBar/suggestions/Suggestions';
import Footer from './components/ui/navBar/Footer';
import CreateFirstPet from './pages/CreateFirstPet';
import { useNavigateContext } from './context/navigationContext';
import Settings from './pages/Settings/Settings';

export default function App() {
  // Get userId from useUserContext
  const userIdLS = localStorage.getItem('userId');
  const { userId } = useUserContext();
  const { active } = useNavigateContext();

  return (
    <BrowserRouter>
      {userIdLS !== null || userId !== '' ? (
        <div className="md:pl-56 lg:pl-72 pb-20 md:pb-0 md:pt-0 xl:flex">
          <Navbar />
          <div
            className={`md:flex-grow xl:flex-grow-[3] xl:basis-0 text-body-md md:max-h-screen overflow-y-auto scrollbarCustom`}
          >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/profile/:id" element={<PetProfile />} />
              <Route exact path="/edit/profile" element={<ProfileEdit />} />
              <Route exact path="/menu" element={<Menu />} />
              <Route exact path="/menu/settings" element={<Settings />} />
              <Route exact path="/saved" element={<Saved />} />
              <Route exact path="/search" element={<Search />} />
              <Route path="/create-first-pet" element={<CreateFirstPet />} />
            </Routes>
          </div>
          {active !== 'createFirstPet' && (
            <div className="hidden xl:flex xl:p-4 xl:pt-2 xl:flex-grow xl:basis-0 min-h-screen border-l border-neutral-300 flex-col justify-between gap-y-4">
              <Suggestions />
              <Footer />
            </div>
          )}
        </div>
      ) : (
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
