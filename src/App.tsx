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
        isDarkMode
          ? "app app--full-screen app--dark-mode"
          : "app app--full-screen app--light-mode"
      }>
      <div className="app__navbar">
        <NavBar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          contentType={contentType}
          setContentType={setContentType}
        />
      </div>
      <div className="app__layout">
        <Layout contentType={contentType} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
