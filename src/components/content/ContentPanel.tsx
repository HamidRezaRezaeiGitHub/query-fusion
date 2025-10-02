import { useEffect, useRef, useState } from "react";
import { ContentType } from "./ContentType";
import { EditorFocus } from "../layout/EditorFocus";
import { IValidationResponse } from "../query/IValidationResponse";
import ContentValidator from "../../services/validation/ContentValidator";
import ContentFormatter from "../../services/formatting/ContentFormatter";
import { useTheme } from "../../contexts/ThemeContext";
import { useContentType } from "../../contexts/ContentTypeContext";
import { Button } from "../ui/button";
import AceEditor from "react-ace";
import type ReactAce from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";
import "../../styles/debug.css";

interface ContentPanelProps {
  getContent: (contentType: ContentType) => string;
  onContentChange: (contentType: ContentType, newContent: string) => void;
  setValidationResponse: (validationResponse: IValidationResponse) => void;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const ContentPanel = ({
  getContent,
  onContentChange,
  setValidationResponse,
  focusedEditor,
  setFocusedEditor,
}: ContentPanelProps) => {
  const { actualTheme } = useTheme();
  const { contentType } = useContentType();
  const editorMode = contentType.toLowerCase();
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = actualTheme === 'dark' ? darkTheme : lightTheme;
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
    <div className="flex flex-col h-full gap-1">
      {/* Editor */}
      <div className="flex-1" onClick={onFocus}>
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
      
      {/* Buttons */}
      <div className="flex gap-1">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept={`.txt, .${contentType.toLowerCase()}`}
          onChange={handleFileChange}
        />
        <Button
          onClick={handleFileUploadButtonClick}
          disabled={false}
          className="flex-1">
          Upload File
        </Button>
        <Button
          variant="secondary"
          onClick={handleClearButton}
          disabled={isContentEmpty()}
          className="flex-1">
          Clear
        </Button>
        <Button
          variant="outline"
          onClick={handleFormatButton}
          disabled={!isContentValid}
          className="flex-1">
          Format Content
        </Button>
      </div>
    </div>
  );
};

export default ContentPanel;
