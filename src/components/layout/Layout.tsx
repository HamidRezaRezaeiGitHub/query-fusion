import { useState } from "react";
import { ContentType } from "../../model/content/ContentType";
import { EditorFocus } from "../../model/editor/EditorFocus";
import { IValidationResponse } from "../../model/validation/IValidationResponse";
import { IContentSpecificMap } from "../../model/content/IContentSpecificMap";
import { DefaultContentSpecificMap } from "../../model/content/DefaultContentSpecificMap";
import { DefaultValidationResponse } from "../../model/validation/DefaultValidationResponse";
import ContentPanel from "../content/ContentPanel";
import QueryResultPanel from "./QueryResultPanel";
import "./Layout.css";
import "../../styles/debug.css";

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
  const [contentSpecificMap, setContentSpecificMap] =
    useState<IContentSpecificMap>(new DefaultContentSpecificMap());
  const [validationResponse, setValidationResponse] =
    useState<IValidationResponse>(new DefaultValidationResponse(false, ""));

  return (
    <div className="layout">
      <div className="layout__content-panel">
        <ContentPanel
          contentType={contentType}
          getContent={contentSpecificMap.getContent}
          onContentChange={contentSpecificMap.setContent}
          setValidationResponse={setValidationResponse}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
      <div className="layout__query-result-panel">
        <QueryResultPanel
          contentType={contentType}
          getContent={contentSpecificMap.getContent}
          getQuery={contentSpecificMap.getQuery}
          getResult={contentSpecificMap.getResult}
          onQueryChange={contentSpecificMap.setQuery}
          onResultChange={contentSpecificMap.setResult}
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
