import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import "../styles/debug.css";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div className="">
      <Navbar
        className="navbar align-items-center"
        bg="dark"
        data-bs-theme="dark"
        sticky="top">
        <Navbar.Brand href="#">
          <img
            alt="logo"
            src="../query.png"
            className="navbar-logo d-inline-block"
          />{" "}
          QueryFusion
        </Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#">JSON</NavDropdown.Item>
            <NavDropdown.Item href="#">XML</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
