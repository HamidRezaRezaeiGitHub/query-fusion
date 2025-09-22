import "./styles/debug.css";
import NavBar from "./components/navbar/NavBar";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import { EditorFocus } from "./components/layout/EditorFocus";

function App() {
  const [focusedEditor, setFocusedEditor] = useState(EditorFocus.Content);
  useEffect(() => {
    console.log(`Editor in focus: ${focusedEditor}`);
  }, [focusedEditor]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground">
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
