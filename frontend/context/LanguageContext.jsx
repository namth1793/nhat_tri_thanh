'use client';
import { createContext, useContext, useState } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('vi');
  const t = translations[lang];
  const toggle = () => setLang((l) => (l === 'vi' ? 'en' : l === 'en' ? 'zh' : 'vi'));
  const setLanguage = (l) => setLang(l);
  return (
    <LanguageContext.Provider value={{ lang, t, toggle, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
