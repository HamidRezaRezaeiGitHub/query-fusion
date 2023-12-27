import QueryPanel from "../query/QueryPanel";
import { ContentType } from "../../model/content/ContentType";
import ResultPanel from "../result/ResultPanel";
import "../styles/QueryResultPanel.css";
import "../styles/debug.css";
import { EditorFocus } from "../../model/editor/EditorFocus";
import { ValidationResponse } from "../../model/validation/ValidationResponse";

interface QueryResultPanelProps {
  contentType: ContentType;
  getContent: (contentType: ContentType) => string;
  getQuery: (contentType: ContentType) => string;
  getResult: (contentType: ContentType) => string;
  onQueryChange: (contentType: ContentType, newQuery: string) => void;
  onResultChange: (contentType: ContentType, newResult: string) => void;
  validationResponse: ValidationResponse;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const QueryResultPanel = ({
  contentType,
  getContent,
  getQuery,
  getResult,
  onQueryChange,
  onResultChange,
  validationResponse,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: QueryResultPanelProps) => {
  return (
    <>
      <div className="query-result__query-panel">
        <QueryPanel
          contentType={contentType}
          getContent={getContent}
          getQuery={getQuery}
          onQueryChange={onQueryChange}
          validationResponse={validationResponse}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
      <div className="query-result__result-panel">
        <ResultPanel
          contentType={contentType}
          getContent={getContent}
          getQuery={getQuery}
          getResult={getResult}
          onResultChange={onResultChange}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
    </>
  );
};

export default QueryResultPanel;
