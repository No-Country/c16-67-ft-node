import React, { useEffect, useState } from 'react';
import Change from '../Settings/ChangeAccount';
import Privacy from '../Settings/Privacy';
import ReportAnIssue from '../Settings/ReportAnIssue';
import HowItWorks from '../Settings/HowItWorks';
import Contaccenter from '../Settings/Contact';
import arrow from '../../assets/images/arrow.svg';
import arrowleft from '../../assets/images/arrowleft.svg';
import { useNavigateContext } from '../../context/navigationContext';

// Define un componente de botón de menú
const MenuButton = ({ label, onClick, isActive }) => (
  <button
    className={`text-sm font-bold md:font-medium px-8 py-4 w-full flex items-center justify-between ${isActive ? 'bg-gradient-to-b from-white to-[#FBF0E7]' : 'hover:bg-gradient-to-b hover:from-white hover:to-[#FBF0E7]'}`}
    onClick={onClick}
  >
    <span
      className={
        label === 'Delete your account' || label === 'Pause your account' ? 'text-[#994708]' : ''
      }
    >
      {label}
    </span>
    {label !== 'Delete your account' && label !== 'Pause your account' && (
      <img src={arrow} alt="" className="w-6 h-6" />
    )}
  </button>
);

// Define el componente principal de Configuración
export default function Settings() {
  const { setActive } = useNavigateContext();

  useEffect(() => {
    setActive('settings');
  }, []);

  const [currentPage, setCurrentPage] = useState(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const handleBackButtonClick = () => {
    setCurrentPage(null);
  };

  const handleCancelClick = () => {
    handleBackButtonClick(); // Llama la función handleBackButtonClick
    // Aquí puedes realizar otras acciones necesarias al hacer clic en "Cancel"
    console.log('Cancel button clicked from Setting');
    // Por ejemplo, redirigir a la página principal
    // history.push('/');
  };

  // Función para renderizar el contenido de la página actual
  const renderContent = (currentPage) => {
    switch (currentPage) {
      case 'privacy':
        return <Privacy onCancelClick={handleCancelClick} />;
      case 'change':
        return <Change onCancelClick={handleCancelClick} />;
      case 'delete':
        return <p>Content for Delete your account</p>;
      case 'pause':
        return <p>Content for Pause your account</p>;
      case 'Report an issue':
        return <ReportAnIssue onCancelClick={handleCancelClick} />;
      case 'How to use app':
        return <HowItWorks onCancelClick={handleCancelClick} />;
      case 'Contact center':
        return <Contaccenter onCancelClick={handleCancelClick} />;
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col bg-white h-screen px-12 max-w-4xl mx-auto">
      {currentPage ? (
        <div className="mt-8">{renderContent(currentPage)}</div>
      ) : (
        <>
          <p className="text-3xl mt-10  mb-10">Settings</p>
          <p className="text-2xl  mb-2">Account Center</p>
          <MenuButton
            label="Privacy"
            onClick={() => handleButtonClick('privacy')}
            isActive={currentPage === 'privacy'}
          />

          <MenuButton
            label="Change Google Account"
            onClick={() => handleButtonClick('change')}
            isActive={currentPage === 'change'}
          />

          <MenuButton
            label="Delete your account"
            onClick={() => handleButtonClick('delete')}
            isActive={currentPage === 'delete'}
          />

          <MenuButton
            label="Pause your account"
            onClick={() => handleButtonClick('pause')}
            isActive={currentPage === 'pause'}
          />

          <p className="text-2xl  mt-16 mb-2">Help</p>
          <MenuButton
            label="Report an issue"
            onClick={() => handleButtonClick('Report an issue')}
            isActive={currentPage === 'Report an issue'}
          />
          <MenuButton
            label="How to use app"
            onClick={() => handleButtonClick('How to use app')}
            isActive={currentPage === 'How to use app'}
          />
          <MenuButton
            label="Contact center"
            onClick={() => handleButtonClick('Contact center')}
            isActive={currentPage === 'Contact center'}
          />
        </>
      )}

      {currentPage && (
        <div className="flex md:hidden justify-end md:justify-start mt-4 p-4  left-0 fixed top-10 ">
          <button
            className="hover:underline flex items-center ml-2"
            onClick={handleBackButtonClick}
          >
            <img src={arrowleft} alt="" className="w-6 h-6 mb-10" />
          </button>
        </div>
      )}
    </div>
  );
}
