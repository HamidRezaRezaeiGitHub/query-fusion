import "../styles/debug.css";
import "../styles/Layout.css";
import { ContentType } from "../types/ContentType";
import ContentPanel from "./ContentPanel";
import QueryPanel from "./QueryPanel";

interface LayoutProps {
  contentType: ContentType;
  isDarkMode: boolean;
}

const Layout = ({ contentType, isDarkMode }: LayoutProps) => {
  return (
    <div className="layout debug-border-black-gray ">
      <div className="content-panel debug-border-red-pink">
        <ContentPanel contentType={contentType} isDarkMode={isDarkMode} />
      </div>
      <div className="divider"></div>
      <div className="query-panel debug-border-navy-lightblue">
        <QueryPanel contentType={contentType} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Layout;
