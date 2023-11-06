import { ContentType } from "../types/ContentType";

interface ContentPanelProps {
  contentType: ContentType;
  isDarkMode: boolean;
}

const ContentPanel = ({ contentType, isDarkMode }: ContentPanelProps) => {
  return (
    <div>
      contentType: {contentType} and isDarkMode: {String(isDarkMode)}
    </div>
  );
};

export default ContentPanel;
