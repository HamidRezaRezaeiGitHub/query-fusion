import { useEffect, useRef, useState } from "react";
import { ContentType } from "../../model/content/ContentType";
import { EditorFocus } from "../../model/editor/EditorFocus";
import { IValidationResponse } from "../../model/validation/IValidationResponse";
import ContentValidator from "../../services/validation/ContentValidator";
import ContentFormatter from "../../services/formatting/ContentFormatter";
import AceEditor from "react-ace";
import type ReactAce from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";
import "./ContentPanel.css";
import "../../styles/debug.css";

interface ContentPanelProps {
  contentType: ContentType;
  getContent: (contentType: ContentType) => string;
  onContentChange: (contentType: ContentType, newContent: string) => void;
  setValidationResponse: (validationResponse: IValidationResponse) => void;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const ContentPanel = ({
  contentType,
  getContent,
  onContentChange,
  setValidationResponse,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: ContentPanelProps) => {
  const editorMode = contentType.toLowerCase();
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = isDarkMode ? darkTheme : lightTheme;
  const editorRef = useRef<ReactAce | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isContentValid, setIsContentValid] = useState(false);

  useEffect(() => {
    if (focusedEditor === EditorFocus.Content && editorRef.current) {
      editorRef.current.editor.focus();
    }
  }, [focusedEditor]);

  useEffect(() => {
    if (editorRef.current) {
      setFocusedEditor(EditorFocus.Content);
      editorRef.current.editor.focus();
    }
    const validationResponse = ContentValidator.isContentValid(
      contentType,
      getContent(contentType)
    );
    setValidationResponse(validationResponse);
    setIsContentValid(validationResponse.isValid);
  }, [contentType, getContent, setFocusedEditor, setValidationResponse]);

  const onLoad = () => {};

  const onChange = (newValue: string) => {
    onContentChange(contentType, newValue);
    const validationResponse = ContentValidator.isContentValid(
      contentType,
      newValue
    );
    setValidationResponse(validationResponse);
    setIsContentValid(validationResponse.isValid);
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

  const isContentEmpty = () => {
    return !getContent(contentType)?.trim();
  };

  const handleClearButton = () => {
    onChange("");
  };

  const handleFormatButton = () => {
    if (!isContentValid) {
      console.log(
        "As long as content is not valid, this function should not be called!"
      );
      return;
    }
    const formattedContent = ContentFormatter.formatContent(
      contentType,
      getContent(contentType)
    );
    onChange(formattedContent);
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
          value={getContent(contentType)}
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
          onClick={handleFileUploadButtonClick}
          disabled={false}>
          Upload File
        </button>
        <button
          className="buttons__clear"
          onClick={handleClearButton}
          disabled={isContentEmpty()}>
          Clear
        </button>
        <button
          className="buttons__format"
          onClick={handleFormatButton}
          disabled={!isContentValid}>
          Format Content
        </button>
      </div>
    </>
  );
};

export default ContentPanel;
