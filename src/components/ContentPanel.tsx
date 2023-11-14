import { useEffect, useRef } from "react";
import { ContentType } from "../types/ContentType";
import { EditorFocus } from "../types/EditorFocus";
import { ContentSpecificValues } from "../models/ContentSpecificValues";
import AceEditor from "react-ace";
import "../styles/ContentPanel.css";
import "../styles/debug.css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";

interface ContentPanelProps {
  contentType: ContentType;
  contentSpecificMap: Map<ContentType, ContentSpecificValues>;
  onContentChange: (contentType: ContentType, newContent: string) => void;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const ContentPanel = ({
  contentType,
  contentSpecificMap,
  onContentChange,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: ContentPanelProps) => {
  const editorMode = contentType === ContentType.JSON ? "json" : "xml";
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = isDarkMode ? darkTheme : lightTheme;
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (focusedEditor === EditorFocus.Content && editorRef.current) {
      editorRef.current.editor.focus();
    }
  }, [isDarkMode, focusedEditor]);

  useEffect(() => {
    if (editorRef.current) {
      setFocusedEditor(EditorFocus.Content);
      editorRef.current.editor.focus();
    }
  }, [contentType]);

  const onLoad = () => {
    console.log(
      `content-editor loaded with value: ${
        contentSpecificMap.get(contentType)?.content || ""
      }`
    );
  };

  const onChange = (newValue: string) => {
    onContentChange(contentType, newValue);
  };

  const onFocus = () => {
    setFocusedEditor(EditorFocus.Content);
  };

  return (
    <>
      <div className="content" onClick={onFocus}>
        <AceEditor
          placeholder={`Copy your ${editorMode} content here...`}
          mode={editorMode}
          theme={editorTheme}
          name="content-editor"
          onLoad={onLoad}
          onChange={onChange}
          ref={editorRef}
          focus={focusedEditor === EditorFocus.Content ? true : false}
          onFocus={onFocus}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={
            contentSpecificMap.has(contentType)
              ? contentSpecificMap.get(contentType)?.content
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
      <div className="buttons debug-border-black-gray">Buttons Container</div>
    </>
  );
};

export default ContentPanel;
