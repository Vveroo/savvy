 
import React, { createContext, useState, useContext } from "react";
import { useColorScheme } from "react-native";
import { COLORS } from "../styles/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState(null);


  const isDarkMode = override !== null 
    ? override === "dark" 
    : systemScheme === "dark";

  const toggleTheme = () => {
    if (override === null) {
      setOverride(systemScheme === "dark" ? "light" : "dark");
    } else {
      setOverride(override === "dark" ? "light" : "dark");
    }
  };

  const resetToSystem = () => setOverride(null);

  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, resetToSystem, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
