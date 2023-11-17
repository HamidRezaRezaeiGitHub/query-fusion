import { ContentType } from "../types/ContentType";
import { EditorFocus } from "../types/EditorFocus";
import { ContentSpecificValues } from "../models/ContentSpecificValues";
import { DefaultContentSpecificValues } from "../models/DefaultContentSpecificValues";
import ContentPanel from "./ContentPanel";
import "../styles/debug.css";
import "../styles/Layout.css";
import { useState } from "react";
import QueryResultPanel from "./QueryResultPanel";
import { ValidationResponse } from "../types/ValidationResponse";

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
  const [validationResponse, setValidationResponse] =
    useState<ValidationResponse>({
      isValid: false,
      validationError: "",
    });

  const handleEditorChange = (
    contentType: ContentType,
    key: keyof ContentSpecificValues,
    newValue: string
  ) => {
    const updatedContentSpecificMap = new Map(contentSpecificMap);
    const currentContentSpecificValues =
      updatedContentSpecificMap.get(contentType) ||
      new DefaultContentSpecificValues();

    currentContentSpecificValues[key] = newValue;

    updatedContentSpecificMap.set(contentType, currentContentSpecificValues);
    setContentSpecificMap(updatedContentSpecificMap);
  };

  const handleContentChange = (
    contentType: ContentType,
    newContent: string
  ) => {
    handleEditorChange(contentType, "content", newContent);
  };

  const handleQueryChange = (contentType: ContentType, newQuery: string) => {
    handleEditorChange(contentType, "query", newQuery);
  };

  const handleResultChange = (contentType: ContentType, newResult: string) => {
    handleEditorChange(contentType, "result", newResult);
  };

  return (
    <div className="layout">
      <div className="layout__content-panel">
        <ContentPanel
          contentType={contentType}
          contentSpecificMap={contentSpecificMap}
          onContentChange={handleContentChange}
          setValidationResponse={setValidationResponse}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
      <div className="layout__query-result-panel">
        <QueryResultPanel
          contentType={contentType}
          contentSpecificMap={contentSpecificMap}
          onQueryChange={handleQueryChange}
          onResultChange={handleResultChange}
          validationResponse={validationResponse}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
    </div>
  );
};

export default Layout;
