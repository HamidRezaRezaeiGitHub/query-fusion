import "./styles/debug.css";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import { EditorFocus } from "./components/layout/EditorFocus";
import { useTheme } from "./contexts/useTheme";
import { cn } from "./lib/utils";

function App() {
  const { isDarkMode } = useTheme();
  const [focusedEditor, setFocusedEditor] = useState(EditorFocus.Content);
  useEffect(() => {
    console.log(`Editor in focus: ${focusedEditor}`);
  }, [focusedEditor]);

  return (
    <div
      className={cn(
        "flex flex-col h-screen w-full overflow-hidden",
        isDarkMode ? "dark bg-gray-900" : "bg-blue-50"
      )}>
      <div className="flex-shrink-0 h-16">
        <NavBar />
      </div>
      <div className="flex-1 flex">
        <Layout
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
    </div>
  );
}

export default App;
