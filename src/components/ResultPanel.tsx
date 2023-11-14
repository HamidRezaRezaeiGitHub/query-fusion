import { ContentType } from "../types/ContentType";

interface ResultPanelProps {
  contentType: ContentType;
  isDarkMode: boolean;
}

const ResultPanel = ({ contentType, isDarkMode }: ResultPanelProps) => {
  return (
    <div>
      contentType: {contentType} and isDarkMode: {String(isDarkMode)}
    </div>
  );
};

export default ResultPanel;
