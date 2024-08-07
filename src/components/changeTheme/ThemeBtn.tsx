'use client';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
export default function ThemeSwap({ handleOnClick }: { handleOnClick?: (e?: any) => void }) {
  const { changeTheme } = useContext(ThemeContext);
  if (!changeTheme) throw new Error();
  return (
    <div className="dropdown dropdown-bottom">
      <button tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </button>
      <ul className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl">
        <li onClick={(e) => changeTheme(e)}>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Dark"
            value="dark"
          />
        </li>
        <li onClick={(e) => changeTheme(e)}>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Light"
            value="light"
          />
        </li>
        <li onClick={(e) => changeTheme(e)}>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Retro"
            value="retro"
          />
        </li>
        <li onClick={(e) => changeTheme(e)}>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Cyberpunk"
            value="cyberpunk"
          />
        </li>
        <li onClick={(e) => changeTheme(e)}>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Aqua"
            value="aqua"
          />
        </li>
        <li onClick={(e) => changeTheme(e)}>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
            aria-label="Cupcake"
            value="cupcake"
          />
        </li>
      </ul>
    </div>
  );
}
