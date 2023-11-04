import "./App.css";
import "./styles/debug.css";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import { useState } from "react";
import { ContentType } from "./types/ContentType";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [contentType, setContentType] = useState<ContentType>(ContentType.XML);

  return (
    <div
      className={
        isDarkMode ? "app full-screen dark-mode" : "app full-screen light-mode"
      }>
      <div className="flex-item-navbar debug-border-red-pink">
        <NavBar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          contentType={contentType}
          setContentType={setContentType}
        />
      </div>
      <div className="flex-item-layout">
        <Layout />
      </div>
    </div>
  );
}

export default App;
