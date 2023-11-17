import { useEffect, useRef } from "react";
import { ContentType } from "../types/ContentType";
import { EditorFocus } from "../types/EditorFocus";
import { ContentSpecificValues } from "../models/ContentSpecificValues";
import contentValidator from "../services/contentValidator";
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
  setIsContentValid: (isContentValid: boolean) => void;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const ContentPanel = ({
  contentType,
  contentSpecificMap,
  onContentChange,
  setIsContentValid,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: ContentPanelProps) => {
  const editorMode = contentType.toLowerCase();
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = isDarkMode ? darkTheme : lightTheme;
  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setIsContentValid(
      contentValidator.isContentValid(
        contentType,
        contentSpecificMap.get(contentType)?.content || ""
      )
    );
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
    setIsContentValid(contentValidator.isContentValid(contentType, newValue));
  };

  const onFocus = () => {
    setFocusedEditor(EditorFocus.Content);
  };

  const handleFileUploadButtonClick = () => {
    fileInputRef!.current!.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      console.log("FileList returned by the HTMLInputElement is null!");
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (readEvent: ProgressEvent<FileReader>) => {
      const fileContent = readEvent.target!.result as string;
      onChange(fileContent);
    };
    reader.readAsText(file);
  };

  const handleClearButton = () => {
    onChange("");
  };

  return (
    <>
      <div className="content" onClick={onFocus}>
        <AceEditor
          placeholder={`Copy your ${editorMode.toUpperCase()} content here...`}
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
          value={contentSpecificMap.get(contentType)?.content || ""}
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
      <div className="buttons debug-border-black-gray">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept={`.txt, .${contentType.toLowerCase()}`}
          onChange={handleFileChange}
        />
        <button
          className="btn btn-primary buttons__upload"
          onClick={handleFileUploadButtonClick}>
          Upload File
        </button>
        <button
          className="buttons__clear"
          onClick={handleClearButton}
          disabled={false}>
          Clear
        </button>
        <button
          className="buttons__format"
          onClick={() => console.log("Format button clicked.")}
          disabled={false}>
          Format Content
        </button>
      </div>
    </>
  );
};

export default ContentPanel;
