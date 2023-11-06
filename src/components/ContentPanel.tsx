import { ContentType } from "../types/ContentType";
import "../styles/ContentPanel.css";
import "../styles/debug.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-monokai";

interface ContentPanelProps {
  contentType: ContentType;
  isDarkMode: boolean;
}

const ContentPanel = ({ contentType, isDarkMode }: ContentPanelProps) => {
  const editorMode = contentType === ContentType.JSON ? "json" : "xml";

  const onLoad = () => {
    console.log("Editor loaded");
  };

  const onChange = (newValue: string) => {
    console.log("Change", newValue);
  };

  return (
    <>
      <div className="content-container debug-border-green-lime">
        <AceEditor
          placeholder={`Copy your ${editorMode} content here...`}
          mode={editorMode}
          theme="monokai"
          name="editor"
          onLoad={onLoad}
          onChange={onChange}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={``}
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
      <div className="buttons-container debug-border-black-gray">
        Buttons Container
      </div>
    </>
  );
};

export default ContentPanel;
