import { useEffect, useRef } from "react";
import { ContentSpecificValues } from "../models/ContentSpecificValues";
import { ContentType } from "../types/ContentType";
import { EditorFocus } from "../types/EditorFocus";
import AceEditor from "react-ace";
import "../styles/ResultPanel.css";
import "../styles/debug.css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";

interface ResultPanelProps {
  contentType: ContentType;
  contentSpecificMap: Map<ContentType, ContentSpecificValues>;
  onResultChange: (contentType: ContentType, newResult: string) => void;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const ResultPanel = ({
  contentType,
  contentSpecificMap,
  onResultChange,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: ResultPanelProps) => {
  const editorMode = contentType.toLowerCase();
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = isDarkMode ? darkTheme : lightTheme;
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (focusedEditor === EditorFocus.Result && editorRef.current) {
      editorRef.current.editor.focus();
    }
  }, [isDarkMode, focusedEditor]);

  const onLoad = () => {};

  const onChange = (newValue: string) => {
    onResultChange(contentType, newValue);
  };

  const onFocus = () => {
    setFocusedEditor(EditorFocus.Result);
  };

  return (
    <div className="result" onClick={onFocus}>
      <AceEditor
        placeholder={`Query result will be here...`}
        mode={editorMode}
        theme={editorTheme}
        name="result-editor"
        onLoad={onLoad}
        onChange={onChange}
        ref={editorRef}
        focus={focusedEditor === EditorFocus.Result ? true : false}
        onFocus={onFocus}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        readOnly={true}
        value={contentSpecificMap.get(contentType)?.result || ""}
        height="100%"
        width="100%"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
          useWorker: false,
          wrap: true,
        }}
      />
    </div>
  );
};

export default ResultPanel;
