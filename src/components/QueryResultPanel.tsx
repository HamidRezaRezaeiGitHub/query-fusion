import QueryPanel from "./QueryPanel";
import { ContentType } from "../types/ContentType";
import ResultPanel from "./ResultPanel";
import "../styles/QueryResultPanel.css";
import "../styles/debug.css";
import { ContentSpecificValues } from "../models/ContentSpecificValues";
import { EditorFocus } from "../types/EditorFocus";

interface QueryResultPanelProps {
  contentType: ContentType;
  contentSpecificMap: Map<ContentType, ContentSpecificValues>;
  onQueryChange: (contentType: ContentType, newContent: string) => void;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const QueryResultPanel = ({
  contentType,
  contentSpecificMap,
  onQueryChange,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: QueryResultPanelProps) => {
  return (
    <>
      <div className="query-result__query-panel">
        <QueryPanel
          contentType={contentType}
          contentSpecificMap={contentSpecificMap}
          onQueryChange={onQueryChange}
          isDarkMode={isDarkMode}
          focusedEditor={focusedEditor}
          setFocusedEditor={setFocusedEditor}
        />
      </div>
      <div className="query-result__result-panel debug-border-navy-lightblue">
        <ResultPanel contentType={contentType} isDarkMode={isDarkMode} />
      </div>
    </>
  );
};

export default QueryResultPanel;
