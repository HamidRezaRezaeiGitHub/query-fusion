import { useEffect, useRef } from "react";
import { ContentType } from "../content/ContentType";
import { EditorFocus } from "../layout/EditorFocus";
import { useTheme } from "../../contexts/useTheme";
import { useContentType } from "../../contexts/useContentType";
import AceEditor from "react-ace";
import type ReactAce from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";
import "../../styles/debug.css";

interface ResultPanelProps {
  getResult: (contentType: ContentType) => string;
  onResultChange: (contentType: ContentType, newResult: string) => void;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const ResultPanel = ({
  getResult,
  onResultChange,
  focusedEditor,
  setFocusedEditor,
}: ResultPanelProps) => {
  const { isDarkMode } = useTheme();
  const { contentType } = useContentType();
  const editorMode = contentType.toLowerCase();
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = isDarkMode ? darkTheme : lightTheme;
  const editorRef = useRef<ReactAce | null>(null);

  useEffect(() => {
    if (focusedEditor === EditorFocus.Result && editorRef.current) {
      editorRef.current.editor.focus();
    }
  }, [focusedEditor]);

  const onLoad = () => {};

  const onChange = (newValue: string) => {
    onResultChange(contentType, newValue);
  };

  const onFocus = () => {
    setFocusedEditor(EditorFocus.Result);
  };

  return (
    <div className="h-full w-full" onClick={onFocus}>
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
        value={getResult(contentType)}
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
