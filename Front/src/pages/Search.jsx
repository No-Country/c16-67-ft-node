import { useEffect, useState } from 'react';
import { useNavigateContext } from '../context/navigationContext';
import { PetsProfilesContainer } from '../components/SearchPets/PetsProfilesContainer';

export const Search = () => {
  const [inputName, setInputName] = useState('');
  const { setActive } = useNavigateContext();

  useEffect(() => {
    setActive('search');
  }, []);

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  return (
    <main>
      <input
        className="m-4 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm"
        value={inputName}
        onChange={handleInputChange}
        maxLength={25}
        placeholder="Pet´s name"
      ></input>
      <PetsProfilesContainer inputName={inputName} />
    </main>
  );
};