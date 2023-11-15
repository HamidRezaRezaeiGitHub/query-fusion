import { useEffect, useRef } from "react";
import { ContentType } from "../types/ContentType";
import { EditorFocus } from "../types/EditorFocus";
import { ContentSpecificValues } from "../models/ContentSpecificValues";
import AceEditor from "react-ace";
import "../styles/QueryPanel.css";
import "../styles/debug.css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";

interface QueryPanelProps {
  contentType: ContentType;
  contentSpecificMap: Map<ContentType, ContentSpecificValues>;
  onQueryChange: (contentType: ContentType, newQuery: string) => void;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const QueryPanel = ({
  contentType,
  contentSpecificMap,
  onQueryChange,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: QueryPanelProps) => {
  const editorMode = contentType === ContentType.JSON ? "json" : "xml";
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = isDarkMode ? darkTheme : lightTheme;
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (focusedEditor === EditorFocus.Query && editorRef.current) {
      editorRef.current.editor.focus();
    }
  }, [isDarkMode, focusedEditor]);

  const onLoad = () => {
    console.log(
      `query-editor loaded with value: ${
        contentSpecificMap.get(contentType)?.query || ""
      }`
    );
  };

  const onChange = (newValue: string) => {
    onQueryChange(contentType, newValue);
  };

  const onFocus = () => {
    setFocusedEditor(EditorFocus.Query);
  };

  return (
    <div className="query" onClick={onFocus}>
      <AceEditor
        placeholder={`Copy your ${editorMode} query here...`}
        mode={editorMode}
        theme={editorTheme}
        name="query-editor"
        onLoad={onLoad}
        onChange={onChange}
        ref={editorRef}
        focus={focusedEditor === EditorFocus.Query ? true : false}
        onFocus={onFocus}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={
          contentSpecificMap.has(contentType)
            ? contentSpecificMap.get(contentType)?.query
            : ""
        }
        height="100%"
        width="100%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
          useWorker: false,
        }}
      />
    </div>
  );
};

export default QueryPanel;
