import { ContentType } from "../content/ContentType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ChevronDown } from "lucide-react";
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
        "h-16 px-4 border-b",
        "bg-background text-foreground border-border"
      )}>
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="logo"
              src="../query.png"
              className="h-6 w-auto"
            />
            <span className="text-lg font-semibold">QueryFusion</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {contentType}
                <ChevronDown className="h-4 w-4" />
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

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}>
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="h-4 w-4"
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild>
            <a
              href="https://github.com/HamidRezaRezaeiGitHub/QueryFusion"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
