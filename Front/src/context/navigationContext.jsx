import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigateContext = () => useContext(NavigationContext);
export const NavigateProvider = ({ children }) => {
  const [active, setActive] = useState('feed');

  return (
    <NavigationContext.Provider value={{ active, setActive }}>
      {children}
    </NavigationContext.Provider>
  );
};
