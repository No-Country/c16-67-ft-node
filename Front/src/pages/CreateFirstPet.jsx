import { useEffect } from 'react';
import PetModal from '../components/ui/modal/PetModal';
import { useModalContext } from '../context/modalContext';

export const CreateFirstPet = () => {
  const { openModal } = useModalContext();
  useEffect(() => {
    openModal({ petModal: true, xBtnPetModal: true });
  }, []);
  return (
    <main>
      <PetModal />
    </main>
  );
};
export default CreateFirstPet;
