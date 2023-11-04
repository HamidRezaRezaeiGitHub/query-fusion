import { Container } from "react-bootstrap";
import "../styles/debug.css";
import "../styles/Layout.css";

const Layout = () => {
  return (
    <Container fluid className="layout debug-border-black-gray">
      <div className="flex-item-left-panel"></div>
      <div className="flex-item-right-panel"></div>
      Layout
    </Container>
  );
};

export default Layout;
