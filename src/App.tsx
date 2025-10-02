import "./styles/debug.css";
import { FlexibleNavbar } from "./components/navbar";
import { SingleChangingIconThemeToggle } from "./components/theme";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import { EditorFocus } from "./components/layout/EditorFocus";
import { useContentType } from "./contexts/useContentType";
import { ContentType } from "./components/content/ContentType";

function App() {
  const [focusedEditor, setFocusedEditor] = useState(EditorFocus.Content);
  const { contentType, setContentType } = useContentType();

  useEffect(() => {
    console.log(`Editor in focus: ${focusedEditor}`);
  }, [focusedEditor]);

  // Define navigation items for content type selection
  const navItems = [
    {
      label: contentType === ContentType.JSON ? "JSON (Active)" : "JSON",
      onClick: () => setContentType(ContentType.JSON),
    },
    {
      label: contentType === ContentType.XML ? "XML (Active)" : "XML",
      onClick: () => setContentType(ContentType.XML),
    },
  ];

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="flex-shrink-0">
        <FlexibleNavbar
          brandText="QueryFusion"
          showLogo={true}
          logoSize="md"
          showBrandText={true}
          navItems={navItems}
          showAuthButtons={false}
          ThemeToggleComponent={SingleChangingIconThemeToggle}
          showThemeToggle={true}
          enableMobileMenu={true}
        />
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
