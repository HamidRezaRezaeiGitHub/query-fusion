import { ContentType } from "../types/ContentType";
import "../styles/ContentPanel.css";
import "../styles/debug.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";

interface ContentPanelProps {
  contentType: ContentType;
  isDarkMode: boolean;
}

const ContentPanel = ({ contentType, isDarkMode }: ContentPanelProps) => {
  const [content, setContent] = useState("");
  const editorMode = contentType === ContentType.JSON ? "json" : "xml";
  const lightTheme = "chrome";
  const darkTheme = "monokai";
  const editorTheme = isDarkMode ? darkTheme : lightTheme;

  const onLoad = () => {
    console.log("Editor loaded");
  };

  const onChange = (newValue: string) => {
    setContent(newValue);
    console.log("Change", newValue);
  };

  return (
    <>
      <div className="content">
        <AceEditor
          placeholder={`Copy your ${editorMode} content here...`}
          mode={editorMode}
          theme={editorTheme}
          name="editor"
          onLoad={onLoad}
          onChange={onChange}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={content}
          height="100%"
          width="100%"
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>
      <div className="buttons debug-border-black-gray">Buttons Container</div>
    </>
  );
};

export default ContentPanel;
