import { useCallback, useEffect, useRef, useState } from "react";
import { ContentType } from "../../model/content/ContentType";
import { EditorFocus } from "../../model/editor/EditorFocus";
import { IValidationResponse } from "../../model/validation/IValidationResponse";
import AceEditor from "react-ace";
import type ReactAce from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";
import "./QueryPanel.css";
import "../../styles/debug.css";

interface QueryPanelProps {
  contentType: ContentType;
  getContent: (contentType: ContentType) => string;
  getQuery: (contentType: ContentType) => string;
  onQueryChange: (contentType: ContentType, newQuery: string) => void;
  validationResponse: IValidationResponse;
  isDarkMode: boolean;
  focusedEditor: EditorFocus;
  setFocusedEditor: (editor: EditorFocus) => void;
}

const QueryPanel = ({
  contentType,
  getContent,
  getQuery,
  onQueryChange,
  validationResponse,
  isDarkMode,
  focusedEditor,
  setFocusedEditor,
}: QueryPanelProps) => {
  const editorMode = contentType.toLowerCase();
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = isDarkMode ? darkTheme : lightTheme;
  const editorRef = useRef<ReactAce | null>(null);
  const [placeholderValue, setPlaceHolderValue] = useState("");
  const [editorValue, setEditorValue] = useState("");

  const isQueryEmpty = useCallback(() => {
    return !getQuery(contentType)?.trim();
  }, [contentType, getQuery]);

  const isContentEmpty = useCallback(() => {
    return !getContent(contentType)?.trim();
  }, [contentType, getContent]);

  useEffect(() => {
    if (focusedEditor === EditorFocus.Query && editorRef.current) {
      editorRef.current.editor.focus();
    }
  }, [focusedEditor]);

  useEffect(() => {
    if (validationResponse.isValid()) {
      setPlaceHolderValue(
        `Enter your ${contentType.toUpperCase()} query here.`
      );
    } else {
      setPlaceHolderValue(
        `Once content's valid, enter your ${contentType.toUpperCase()} query here.`
      );
    }
  }, [contentType, validationResponse]);

  useEffect(() => {
    if (validationResponse.isValid()) {
      setEditorValue(getQuery(contentType));
      return;
    }

    if (isContentEmpty()) {
      setEditorValue("");
      return;
    }

    if (isQueryEmpty()) {
      setEditorValue(
        `You can enter your ${contentType.toUpperCase()} query here once content is valid.\n${validationResponse.getValidationError()}`
      );
      return;
    }

    setEditorValue(
      `${contentType.toUpperCase()} query will be displayed here once content is valid.\n${validationResponse.getValidationError()}`
    );
  }, [
    contentType,
    getContent,
    getQuery,
    isContentEmpty,
    isQueryEmpty,
    validationResponse,
  ]);

  const onLoad = () => {};

  const onChange = (newValue: string) => {
    if (validationResponse.isValid()) {
      onQueryChange(contentType, newValue);
      setEditorValue(newValue);
    } else {
      if (isContentEmpty()) {
        setEditorValue(""); // Placeholder will be displayed.
      } else {
        if (isQueryEmpty()) {
          setEditorValue(
            `You can enter your ${contentType.toUpperCase()} query here once content is valid.\n${validationResponse.getValidationError()}`
          );
        } else {
          setEditorValue(
            `${contentType.toUpperCase()} query will be displayed here once content is valid.\n${validationResponse.getValidationError()}`
          );
        }
      }
    }
  };

  const onFocus = () => {
    setFocusedEditor(EditorFocus.Query);
  };

  return (
    <div className="query" onClick={onFocus}>
      <AceEditor
        placeholder={placeholderValue}
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
        value={editorValue}
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

export default QueryPanel;
