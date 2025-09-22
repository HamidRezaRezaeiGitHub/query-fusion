import { ContentType } from "../content/ContentType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "../../contexts/useTheme";
import { useContentType } from "../../contexts/useContentType";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "../../lib/utils";
import "../../styles/debug.css";

const NavBar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { contentType, setContentType } = useContentType();

  return (
    <nav
      className={cn(
        "h-16 px-4 flex items-center justify-between",
        "border-b border-border",
        isDarkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"
      )}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            alt="logo"
            src="../query.png"
            className="w-auto h-8 object-contain"
          />
          <span className="text-lg font-semibold">QueryFusion</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {contentType}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setContentType(ContentType.JSON)}>
              JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setContentType(ContentType.XML)}>
              XML
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9">
          <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            className="h-5 w-5"
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-9 w-9">
          <a
            href="https://github.com/HamidRezaRezaeiGitHub/QueryFusion"
            target="_blank"
            rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
