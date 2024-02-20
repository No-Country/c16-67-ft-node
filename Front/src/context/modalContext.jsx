import { useContext, useState, createContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    description: '',
    title: '',
    confirmBtn: '',
    denyBtn: '',
    petModal: false,
    xBtnPetModal: false,
    chooseModal: false,
    error: false,
    onClick: null
  });

  const openModal = (modalConfig) => {
    setModalState({
      isOpen: true,
      ...modalConfig
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      description: '',
      title: '',
      confirmBtn: '',
      denyBtn: '',
      petModal: false,
      xBtnPetModal: false,
      chooseModal: false,
      error: false,
      onClick: null
    });
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
