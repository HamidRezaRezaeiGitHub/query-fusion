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
      <div className="layout__content-panel debug-border-red-pink">
        <ContentPanel contentType={contentType} isDarkMode={isDarkMode} />
      </div>
      <div className="layout__divider"></div>
      <div className="layout__query-panel debug-border-navy-lightblue">
        <QueryPanel contentType={contentType} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Layout;
