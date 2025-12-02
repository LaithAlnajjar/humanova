import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '@/lib/i18n';

type Language = 'en' | 'ar';

interface LangContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

const LANG_STORAGE_KEY = 'humanova-lang';

const applyDir = (lang: Language) => {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
};

export const LangProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const stored = (localStorage.getItem(LANG_STORAGE_KEY) as Language | null) ?? null;
    const initial = stored === 'ar' || stored === 'en' ? stored : 'en';
    setLangState(initial);
    applyDir(initial);
    i18n.changeLanguage(initial);
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    localStorage.setItem(LANG_STORAGE_KEY, next);
    applyDir(next);
    i18n.changeLanguage(next);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        toggleLang
      }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const useLang = (): LangContextValue => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
};
