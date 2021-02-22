import { lightTheme, darkTheme } from './index';
import useDarkMode from 'use-dark-mode';
import { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export const ToggleThemeContext = createContext({ value: false, toggle: () => {} });

const Provider: React.FC = ({ children }) => {
  const { value, toggle } = useDarkMode(false, { storageKey: undefined, onChange: undefined });
  const theme = value ? darkTheme : lightTheme;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const body = (
    <ToggleThemeContext.Provider value={{ value, toggle }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleThemeContext.Provider>
  );

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return body;
};

export default Provider;
