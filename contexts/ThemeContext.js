
import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { COLORS } from "../styles/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); 
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === "dark");

  useEffect(() => {
    setIsDarkMode(systemScheme === "dark");
  }, [systemScheme]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
