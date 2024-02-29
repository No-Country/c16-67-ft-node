import { useContext, useState, createContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    description: '',
    title: '',
    confirmBtn: '',
    denyBtn: '',
    chooseModal: false,
    error: false,
    onClick: null
  });

  const [petModalState, setPetModalState] = useState({
    isOpen: false,
    xBtnPetModal: false
  });

  const openModal = (modalConfig) => {
    if (modalConfig.petModal) {
      setPetModalState({
        isOpen: true,
        ...modalConfig
      });
    } else {
      setModalState({
        isOpen: true,
        ...modalConfig
      });
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      description: '',
      title: '',
      confirmBtn: '',
      denyBtn: '',
      chooseModal: false,
      error: false,
      onClick: null
    });

    setPetModalState({
      isOpen: false,
      xBtnPetModal: false
    });
  };

  return (
    <ModalContext.Provider value={{ modalState, petModalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
