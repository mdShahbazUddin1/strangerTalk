import React, {createContext, useContext, useState} from 'react';

const HangUpContext = createContext();

export const HangUpProvider = ({children}) => {
  const [hangUp, setHangUp] = useState(false);

  return (
    <HangUpContext.Provider value={{hangUp, setHangUp}}>
      {children}
    </HangUpContext.Provider>
  );
};

export const useHangUp = () => useContext(HangUpContext);
