import "../styles/debug.css";
import "../styles/Layout.css";

const Layout = () => {
  return (
    <div className="layout debug-border-black-gray ">
      <div className="content-panel debug-border-red-pink">ContentPanel</div>
      <div className="divider"></div>
      <div className="query-panel debug-border-navy-lightblue">QueryPanel</div>
    </div>
  );
};

export default Layout;
