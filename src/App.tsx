import "./App.css";
import "./styles/debug.css";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import { ContentType } from "./model/content/ContentType";
import { EditorFocus } from "./model/editor/EditorFocus";
import { useTheme } from "./contexts/useTheme";

function App() {
  const { isDarkMode } = useTheme();
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
          contentType={contentType}
          setContentType={setContentType}
        />
      </div>
      <div className="app__layout">
        <Layout
          contentType={contentType}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
    </div>
  );
}

export default App;
