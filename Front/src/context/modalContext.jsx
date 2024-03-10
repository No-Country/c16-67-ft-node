import { useContext, useState, createContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalChooseState, setModalChooseState] = useState({
    isOpen: false,
    description: '',
    title: '',
    confirmBtn: '',
    denyBtn: '',
    chooseModal: true,
    onClick: null
  });

  const [modalTextState, setModalTextState] = useState({
    isOpen: false,
    description: '',
    error: false
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
    } else if (modalConfig.modalTextState) {
      setModalTextState({
        isOpen: true,
        ...modalConfig
      });
    } else {
      setModalChooseState({
        isOpen: true,
        ...modalConfig
      });
    }
  };

  const closeModal = () => {
    setModalChooseState({
      isOpen: false,
      description: '',
      title: '',
      confirmBtn: '',
      denyBtn: '',
      chooseModal: true,
      onClick: null
    });

    setPetModalState({
      isOpen: false,
      xBtnPetModal: false
    });

    setModalTextState({
      isOpen: false,
      description: '',
      error: false
    });
  };

  return (
    <ModalContext.Provider
      value={{ modalChooseState, petModalState, modalTextState, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  return useContext(ModalContext);
};
