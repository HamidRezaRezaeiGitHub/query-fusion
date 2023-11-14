import { ContentType } from "../types/ContentType";
import { EditorFocus } from "../types/EditorFocus";
import { ContentSpecificValues } from "../models/ContentSpecificValues";
import { DefaultContentSpecificValues } from "../models/DefaultContentSpecificValues";
import ContentPanel from "./ContentPanel";
import "../styles/debug.css";
import "../styles/Layout.css";
import { useState } from "react";
import QueryResultPanel from "./QueryResultPanel";

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
  const [contentSpecificMap, setContentSpecificMap] = useState<
    Map<ContentType, ContentSpecificValues>
  >(new Map());

  const handleContentChange = (
    contentType: ContentType,
    newContent: string
  ) => {
    const updatedContentSpecificMap = new Map(contentSpecificMap);
    const currentContentSpecificValues =
      updatedContentSpecificMap.get(contentType) ||
      new DefaultContentSpecificValues();
    currentContentSpecificValues.content = newContent;
    updatedContentSpecificMap.set(contentType, currentContentSpecificValues);
    setContentSpecificMap(updatedContentSpecificMap);
  };

  const handleQueryChange = (contentType: ContentType, newQuery: string) => {
    const updatedContentSpecificMap = new Map(contentSpecificMap);
    const currentContentSpecificValues =
      updatedContentSpecificMap.get(contentType) ||
      new DefaultContentSpecificValues();
    currentContentSpecificValues.query = newQuery;
    updatedContentSpecificMap.set(contentType, currentContentSpecificValues);
    setContentSpecificMap(updatedContentSpecificMap);
  };

  const handleResultChange = (contentType: ContentType, newresult: string) => {
    const updatedContentSpecificMap = new Map(contentSpecificMap);
    const currentContentSpecificValues =
      updatedContentSpecificMap.get(contentType) ||
      new DefaultContentSpecificValues();
    currentContentSpecificValues.result = newresult;
    updatedContentSpecificMap.set(contentType, currentContentSpecificValues);
    setContentSpecificMap(updatedContentSpecificMap);
  };

  return (
    <div className="layout">
      <div className="layout__content-panel">
        <ContentPanel
          contentType={contentType}
          contentSpecificMap={contentSpecificMap}
          onContentChange={handleContentChange}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
      <div className="layout__divider"></div>
      <div className="layout__query-result-panel">
        <QueryResultPanel
          contentType={contentType}
          contentSpecificMap={contentSpecificMap}
          onQueryChange={handleQueryChange}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
    </div>
  );
};

export default Layout;
