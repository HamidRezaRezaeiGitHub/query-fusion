import { useState } from "react";
import { EditorFocus } from "./EditorFocus";
import { IValidationResponse } from "../query/IValidationResponse";
import { IContentSpecificMap } from "../content/IContentSpecificMap";
import { DefaultContentSpecificMap } from "../content/DefaultContentSpecificMap";
import { DefaultValidationResponse } from "../query/DefaultValidationResponse";
import ContentPanel from "../content/ContentPanel";
import QueryPanel from "../query/QueryPanel";
import ResultPanel from "../result/ResultPanel";
import "../../styles/debug.css";

interface LayoutProps {
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const Layout = ({
  focusedEditor,
  setFocusedEditor,
}: LayoutProps) => {
  const [contentSpecificMap] = useState<IContentSpecificMap>(
    () => new DefaultContentSpecificMap(),
  );
  const [validationResponse, setValidationResponse] =
    useState<IValidationResponse>(new DefaultValidationResponse(false, ""));

  return (
    <div className="flex flex-1 h-full w-full gap-1 p-1">
      {/* Layout: 2 columns on md+ screens, 1 column on smaller screens */}
      
      {/* Wide screen layout (2 columns) */}
      <div className="hidden md:flex w-full gap-1">
        {/* Column 1: Content Panel */}
        <div className="flex flex-col flex-1 gap-1">
          <ContentPanel
            getContent={contentSpecificMap.getContent}
            onContentChange={contentSpecificMap.setContent}
            setValidationResponse={setValidationResponse}
            focusedEditor={focusedEditor}
            setFocusedEditor={setFocusedEditor}
          />
        </div>
        
        {/* Column 2: Query and Result Panels stacked */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex-1">
            <QueryPanel
              getContent={contentSpecificMap.getContent}
              getQuery={contentSpecificMap.getQuery}
              onQueryChange={contentSpecificMap.setQuery}
              validationResponse={validationResponse}
              focusedEditor={focusedEditor}
              setFocusedEditor={setFocusedEditor}
            />
          </div>
          <div className="flex-1">
            <ResultPanel
              getResult={contentSpecificMap.getResult}
              onResultChange={contentSpecificMap.setResult}
              focusedEditor={focusedEditor}
              setFocusedEditor={setFocusedEditor}
            />
          </div>
        </div>
      </div>

      {/* Small screen layout (1 column) */}
      <div className="flex md:hidden flex-col w-full gap-1">
        <div className="flex-1">
          <ContentPanel
            getContent={contentSpecificMap.getContent}
            onContentChange={contentSpecificMap.setContent}
            setValidationResponse={setValidationResponse}
            focusedEditor={focusedEditor}
            setFocusedEditor={setFocusedEditor}
          />
        </div>
        <div className="flex-1">
          <QueryPanel
            getContent={contentSpecificMap.getContent}
            getQuery={contentSpecificMap.getQuery}
            onQueryChange={contentSpecificMap.setQuery}
            validationResponse={validationResponse}
            focusedEditor={focusedEditor}
            setFocusedEditor={setFocusedEditor}
          />
        </div>
        <div className="flex-1">
          <ResultPanel
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
