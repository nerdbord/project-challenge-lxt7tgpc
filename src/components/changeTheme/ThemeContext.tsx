'use client';

import { createContext, useState, useEffect, useLayoutEffect } from 'react';

interface ThemeContextType {
  theme?: string;
  changeTheme?: (event?: any) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: any) => {
  const getThemeFromLocalStorage = () => {
    const data = localStorage.getItem('theme');
    return data ? JSON.parse(data) : null;
  };
  const saveThemeToLocalStorage = (themeName: string) => {
    localStorage.setItem('theme', JSON.stringify(themeName));
  };

  const [theme, setTheme] = useState<string>('');

  useLayoutEffect(() => {
    const storedTheme = getThemeFromLocalStorage();
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    saveThemeToLocalStorage(theme);
  }, [theme]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = (event?: any) => {
    const nextTheme: string | null = event.target.value || null;
    if (nextTheme) {
      setTheme(nextTheme);
      saveThemeToLocalStorage(nextTheme);
    } else {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }
  };

  if (!mounted) return null;

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
};
