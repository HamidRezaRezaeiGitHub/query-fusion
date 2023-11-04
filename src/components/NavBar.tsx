import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import "../styles/debug.css";
import "../styles/NavBar.css";
import { ContentType } from "../types/ContentType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface NavBarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean | ((prevMode: boolean) => boolean)) => void;
  contentType: ContentType;
  setContentType: (value: ContentType) => void;
}

const NavBar = ({
  isDarkMode,
  setIsDarkMode,
  contentType,
  setContentType,
}: NavBarProps) => {
  return (
    <div className="">
      <Navbar
        className="navbar align-items-center"
        bg={isDarkMode ? "dark" : "light"}
        data-bs-theme={isDarkMode ? "dark" : "light"}
        sticky="top">
        <Navbar.Brand href="#">
          <img
            alt="logo"
            src="../query.png"
            className="navbar-logo d-inline-block"
          />{" "}
          QueryFusion
        </Navbar.Brand>
        <Nav className="push-left">
          <NavDropdown title={contentType} id="collapsible-nav-dropdown">
            <NavDropdown.Item
              href="#"
              onClick={() => setContentType(ContentType.JSON)}>
              JSON
            </NavDropdown.Item>
            <NavDropdown.Item
              href="#"
              onClick={() => setContentType(ContentType.XML)}>
              XML
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="push-right">
          <Nav.Link onClick={() => setIsDarkMode((prevMode) => !prevMode)}>
            <FontAwesomeIcon
              className="theme-toggle-icon"
              icon={isDarkMode ? faSun : faMoon}
            />
          </Nav.Link>
          <Nav.Link
            href="https://github.com/HamidRezaRezaeiGitHub/QueryFusion"
            target="_blank">
            <FontAwesomeIcon className="github-icon" icon={faGithub} />
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
