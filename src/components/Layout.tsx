import { ContentType } from "../types/ContentType";
import { EditorFocus } from "../types/EditorFocus";
import ContentPanel from "./ContentPanel";
import QueryPanel from "./QueryPanel";
import "../styles/debug.css";
import "../styles/Layout.css";

interface LayoutProps {
  contentType: ContentType;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const Layout = ({
  contentType,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: LayoutProps) => {
  return (
    <div className="layout">
      <div className="layout__content-panel">
        <ContentPanel
          contentType={contentType}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
      <div className="layout__divider"></div>
      <div className="layout__query-panel">
        <QueryPanel contentType={contentType} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Layout;
