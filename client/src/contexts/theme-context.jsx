import { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSystemPrefersDarkMode } from '../hooks/useSystemPrefersDarkMode';

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const { isSystemPrefersDarkMode } = useSystemPrefersDarkMode();

  const [isDarkModeActive, setIsDarkModeActive] = useState(true);

  // useEffect(() => {
  //   setIsDarkModeActive(isSystemPrefersDarkMode);
  // }, [isSystemPrefersDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkModeActive, setIsDarkModeActive }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.element,
};
