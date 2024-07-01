'use client';
import { ThemeContext } from './ThemeContext';

import { useContext } from 'react';
import ThemeSwap from './ThemeBtn';
import AuthButton from '@/components/AuthButton';

export default function NavBar() {
  const { changeTheme } = useContext(ThemeContext);
  return (
    <>
      <div className="navbar mb-20 justify-around bg-base-100">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          <ThemeSwap handleOnClick={changeTheme} />
        </div>
      </div>
    </>
  );
}
