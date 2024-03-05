import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useSystemPrefersDarkMode = () => {
  const [isSystemPrefersDarkMode, setIsSystemPrefersDarkMode] = useState(false);

  const isColorSchemeDark = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
  });

  useEffect(() => {
    setIsSystemPrefersDarkMode(isColorSchemeDark);
  }, [isColorSchemeDark]);

  return { isSystemPrefersDarkMode };
};
