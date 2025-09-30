"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

// Constants
import { STORAGES, THEMES } from "@/constants";

interface ThemeContext {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContext>({
  isDarkTheme: false,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setTheme] = useState<boolean>(false);

  const handleSaveTheme = useCallback(
    (value: boolean) => {
      setTheme(value);
      const root = window.document.documentElement;

      const storageIsDarkTheme = localStorage.getItem(STORAGES.IS_DARK_THEME);

      // Save to localStorage
      if (
        !storageIsDarkTheme ||
        (storageIsDarkTheme && JSON.parse(storageIsDarkTheme) !== value)
      ) {
        localStorage.setItem(STORAGES.IS_DARK_THEME, JSON.stringify(value));
      }

      // Use cookie to get value from server side
      document.cookie = `${STORAGES.IS_DARK_THEME}=${value}`;

      root.classList.add(value ? THEMES.DARK : THEMES.LIGHT);
      root.classList.remove(value ? THEMES.LIGHT : THEMES.DARK);
    },
    [setTheme],
  );

  useEffect(() => {
    const storageIsDarkTheme = localStorage.getItem(STORAGES.IS_DARK_THEME);
    const isDarkThemeStorage = storageIsDarkTheme
      ? JSON.parse(storageIsDarkTheme)
      : false;
    if (
      !storageIsDarkTheme ||
      (storageIsDarkTheme && isDarkTheme !== isDarkThemeStorage)
    ) {
      handleSaveTheme(isDarkThemeStorage);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    handleSaveTheme(!isDarkTheme);
  }, [handleSaveTheme, isDarkTheme]);

  const value = {
    isDarkTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
