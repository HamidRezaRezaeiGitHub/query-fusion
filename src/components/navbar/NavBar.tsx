import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { ContentType } from "../content/ContentType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "../../contexts/useTheme";
import "./NavBar.css";
import "../../styles/debug.css";

interface NavBarProps {
  contentType: ContentType;
  setContentType: (value: ContentType) => void;
}

const NavBar = ({
  contentType,
  setContentType,
}: NavBarProps) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Navbar
      className="navbar align-items-center"
      bg={isDarkMode ? "dark" : "light"}
      data-bs-theme={isDarkMode ? "dark" : "light"}>
      <Navbar.Brand href="#">
        <img
          alt="logo"
          src="../query.png"
          className="navbar__logo d-inline-block"
        />{" "}
        QueryFusion
      </Navbar.Brand>
      <Nav className="navbar--push-left">
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
      <Nav className="navbar--push-right">
        <Nav.Link onClick={toggleTheme}>
          <FontAwesomeIcon
            className="navbar__switch"
            icon={isDarkMode ? faSun : faMoon}
          />
        </Nav.Link>
        <Nav.Link
          href="https://github.com/HamidRezaRezaeiGitHub/QueryFusion"
          target="_blank">
          <FontAwesomeIcon className="navbar__github" icon={faGithub} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
