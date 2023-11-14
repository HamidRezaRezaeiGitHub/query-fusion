import { ContentType } from "../types/ContentType";
import { EditorFocus } from "../types/EditorFocus";
import ContentPanel from "./ContentPanel";
import QueryPanel from "./QueryPanel";
import "../styles/debug.css";
import "../styles/Layout.css";
import { useState } from "react";

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
  const [contentEditorValues, setContentEditorValues] = useState<
    Map<ContentType, string>
  >(new Map());

  const handleContentChange = (
    contentType: ContentType,
    newContent: string
  ) => {
    // Create a new Map based on the existing map
    const updatedContents = new Map(contentEditorValues);

    // Update the new map with the new content
    updatedContents.set(contentType, newContent);

    // Set the state with the updated map
    setContentEditorValues(updatedContents);
  };

  return (
    <div className="layout">
      <div className="layout__content-panel">
        <ContentPanel
          contentType={contentType}
          contentEditorValues={contentEditorValues}
          onContentChange={handleContentChange}
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
