import "./App.css";
import "./styles/debug.css";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import { EditorFocus } from "./components/layout/EditorFocus";
import { useTheme } from "./contexts/useTheme";

function App() {
  const { isDarkMode } = useTheme();
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
        <NavBar />
      </div>
      <div className="app__layout">
        <Layout
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
    </div>
  );
}

export default App;
