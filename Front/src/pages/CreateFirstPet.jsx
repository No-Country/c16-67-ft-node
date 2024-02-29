import { useEffect } from 'react';
import PetModal from '../components/ui/modal/PetModal';
import { useModalContext } from '../context/modalContext';
import { useNavigateContext } from '../context/navigationContext';

export const CreateFirstPet = () => {
  const { openModal } = useModalContext();
  const { setActive } = useNavigateContext();

  useEffect(() => {
    openModal({ petModal: true });
    setActive('createFirstPet');
  }, []);
  return (
    <main>
      <PetModal />
    </main>
  );
};
export default CreateFirstPet;
