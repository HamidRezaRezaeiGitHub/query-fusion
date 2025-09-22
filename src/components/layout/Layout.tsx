import { useState } from "react";
import { ContentType } from "../content/ContentType";
import { EditorFocus } from "./EditorFocus";
import { IValidationResponse } from "../query/IValidationResponse";
import { IContentSpecificMap } from "../content/IContentSpecificMap";
import { DefaultContentSpecificMap } from "../content/DefaultContentSpecificMap";
import { DefaultValidationResponse } from "../query/DefaultValidationResponse";
import ContentPanel from "../content/ContentPanel";
import QueryPanel from "../query/QueryPanel";
import ResultPanel from "../result/ResultPanel";
import "./Layout.css";
import "../../styles/debug.css";

interface LayoutProps {
  contentType: ContentType;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const Layout = ({
  contentType,
  focusedEditor,
  setFocusedEditor,
}: LayoutProps) => {
  const [contentSpecificMap] = useState<IContentSpecificMap>(
    () => new DefaultContentSpecificMap(),
  );
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
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
      <div className="layout__query-result-panel">
        <div className="layout__query-panel">
          <QueryPanel
            contentType={contentType}
            getContent={contentSpecificMap.getContent}
            getQuery={contentSpecificMap.getQuery}
            onQueryChange={contentSpecificMap.setQuery}
            validationResponse={validationResponse}
            focusedEditor={focusedEditor}
            setFocusedEditor={setFocusedEditor}
          />
        </div>
        <div className="layout__result-panel">
          <ResultPanel
            contentType={contentType}
            getResult={contentSpecificMap.getResult}
            onResultChange={contentSpecificMap.setResult}
            focusedEditor={focusedEditor}
            setFocusedEditor={setFocusedEditor}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
