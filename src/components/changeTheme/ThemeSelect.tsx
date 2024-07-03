'use client';
import { ThemeContext } from './ThemeContext';

import { useContext } from 'react';
import ThemeSwap from './ThemeBtn';

export  function ThemeSelect() {
  const { changeTheme } = useContext(ThemeContext);
  return (
    <>
      <ThemeSwap handleOnClick={changeTheme} />
    </>
  );
}
