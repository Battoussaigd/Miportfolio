import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AppContextType {
  isDark: boolean;
  lang: 'es' | 'en';
  toggleTheme: () => void;
  toggleLang: () => void;
}

const AppContext = createContext<AppContextType>({
  isDark: true, lang: 'es', toggleTheme: () => {}, toggleLang: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') !== 'light');
  const [lang, setLang] = useState<'es' | 'en'>(() => (localStorage.getItem('lang') as 'es' | 'en') || 'es');

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) document.body.classList.remove('light');
    else document.body.classList.add('light');
  }, [isDark]);

  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);

  return (
    <AppContext.Provider value={{
      isDark,
      lang,
      toggleTheme: () => setIsDark(v => !v),
      toggleLang: () => setLang(v => v === 'es' ? 'en' : 'es'),
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
