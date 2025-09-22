import { createContext } from "react";

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);