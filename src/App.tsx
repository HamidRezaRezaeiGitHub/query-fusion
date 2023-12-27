import "./App.css";
import "./styles/debug.css";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import { ContentType } from "./model/content/ContentType";
import { EditorFocus } from "./model/editor/EditorFocus";

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [contentType, setContentType] = useState<ContentType>(ContentType.XML);
  const [focusedEditor, setFocusedEditor] = useState(EditorFocus.Content);
  useEffect(() => {
    console.log(`Editor in focus: ${focusedEditor}`);
  }, [focusedEditor]);

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
        <Layout
          contentType={contentType}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
    </div>
  );
}

export default App;
