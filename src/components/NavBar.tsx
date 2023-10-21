import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import { GitHub } from "react-feather"; // Importing GitHub icon from react-feather
import logo from "../assets/query.png";

interface NavBarProps {
  onContentTypeChange: (contentType: string) => void;
}

const NavBar = ({ onContentTypeChange }: NavBarProps) => {
  const [selectedContentType, setSelectedContentType] = useState("XML");

  const handleContentTypeChange = (contentType: string | null) => {
    if (contentType) {
      setSelectedContentType(contentType);
      onContentTypeChange(contentType); // Propagate the change to parent component
    }
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="px-3">
      <Navbar.Brand href="#home">
        <img src={logo} alt="QueryFusion Logo" height="30" />
        QueryFusion
      </Navbar.Brand>
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedContentType}
        variant="secondary"
        onSelect={handleContentTypeChange}>
        <Dropdown.Item eventKey="XML">XML</Dropdown.Item>
        <Dropdown.Item eventKey="JSON">JSON</Dropdown.Item>
      </DropdownButton>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a
            href="https://github.com/your-username/your-repo"
            target="_blank"
            rel="noopener noreferrer">
            <GitHub size={24} />
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
