import { ContentType } from "../types/ContentType";

interface QueryPanelProps {
  contentType: ContentType;
  isDarkMode: boolean;
}

const QueryPanel = ({ contentType, isDarkMode }: QueryPanelProps) => {
  return (
    <div>
      contentType: {contentType} and isDarkMode: {String(isDarkMode)}
    </div>
  );
};

export default QueryPanel;
