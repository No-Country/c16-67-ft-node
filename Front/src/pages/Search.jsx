import { PetsProfilesContainer } from '../components/SearchPets/PetsProfilesContainer';
import { useEffect, useState } from 'react';
import { useNavigateContext } from '../context/navigationContext';

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
      <h1>Search pets here</h1>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm"
        value={inputName}
        onChange={handleInputChange}
        maxLength={25}
      ></input>
      <PetsProfilesContainer inputName={inputName} setInputName={setInputName} />
    </main>
  );
};
