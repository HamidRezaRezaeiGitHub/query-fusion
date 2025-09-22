import { ReactNode } from "react";
import ThemeProvider from "./ThemeContext";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default AppProvider;