import { ReactNode } from "react";
import ThemeProvider from "./ThemeContext";
import ContentTypeProvider from "./ContentTypeContext";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider>
      <ContentTypeProvider>
        {children}
      </ContentTypeProvider>
    </ThemeProvider>
  );
};

export default AppProvider;