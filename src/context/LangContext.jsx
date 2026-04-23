import { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en';
import fr from '../i18n/fr';
import ar from '../i18n/ar';
import ja from '../i18n/ja';

const TRANSLATIONS = { en, fr, ar, ja };
const RTL = new Set(['ar']);

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLangRaw] = useState(() => localStorage.getItem('am_lang') || 'en');

  function setLang(l) {
    setLangRaw(l);
    localStorage.setItem('am_lang', l);
  }

  const isRTL = RTL.has(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang], isRTL }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
