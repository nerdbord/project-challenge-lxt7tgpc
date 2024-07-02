'use client';

import { createContext, useState, useEffect } from 'react';

const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

interface ThemeContextType {
  theme?: string;
  changeTheme?: (event?: any) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<string>(JSON.parse(localStorage.getItem('theme') || 'light'));

  const saveThemeToLocalStorage = (themeName: string) => {
    localStorage.setItem('theme', JSON.stringify(themeName));
  };

  const changeTheme = (event?: any) => {
    const nextTheme: string | null = event.target.value || null;
    if (nextTheme) {
      setTheme(nextTheme);
      saveThemeToLocalStorage(nextTheme);
    } else {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }
  };
  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
};
