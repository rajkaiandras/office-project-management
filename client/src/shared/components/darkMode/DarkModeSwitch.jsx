import { useContext, useEffect } from 'react';

import { ThemeContext } from '../../../contexts/theme-context';

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export const DarkModeSwitch = () => {
  const { isDarkModeActive, setIsDarkModeActive } = useContext(ThemeContext);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkModeActive);
  }, [isDarkModeActive]);

  const toggleDarkMode = () => {
    setIsDarkModeActive(!isDarkModeActive);
  };

  return (
    <div onClick={() => toggleDarkMode()}>
      {/* {isDarkModeActive ? (
        <SunIcon className="h-6 w-6 text-yellow-600" />
      ) : (
        <MoonIcon className="h-6 w-6 text-blue-600" />
      )} */}
    </div>
  );
};
