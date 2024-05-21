// LanguageContext.js
import React, {createContext, useState, useEffect} from 'react';
import {getLng} from '../helper/ChangeLang';
import strings from '../locales/LocalizedString';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchSelectedLanguage = async () => {
      const selectedLng = await getLng();
      strings.setLanguage(selectedLng);
      setSelectedLanguage(selectedLng);
    };
    fetchSelectedLanguage();
  }, []);

  const changeLanguage = async lng => {
    strings.setLanguage(lng);
    setSelectedLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{selectedLanguage, changeLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};
