import { useEffect, useState } from 'react';
import { useNavigateContext } from '../context/navigationContext';
import { PetsProfilesContainer } from '../components/SearchPets/PetsProfilesContainer';
import { BiSearchAlt2 } from 'react-icons/bi';

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
    <main className="md:flex">
      <div className="px-5 md:flex-grow xl:flex-grow-[3] xl:basis-0 md:pr-5">
        <div className="relative w-full">
          <input
            className="my-4 w-full border-2 border-gray-300 bg-white h-10 px-9 pr-16 rounded-lg text-sm focus:outline-primary-500"
            value={inputName}
            onChange={handleInputChange}
            maxLength={25}
            placeholder="Pet´s name"
          ></input>
          <BiSearchAlt2 className="absolute flex left-[8px] bottom-0 top-[24px] text-[25px]" />
        </div>
        <PetsProfilesContainer inputName={inputName} />
      </div>
    </main>
  );
};
