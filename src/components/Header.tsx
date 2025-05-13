
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBox from "./SearchBox";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="flex md:flex" 
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">{sidebarOpen ? "Close sidebar" : "Open sidebar"}</span>
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-converter-primary to-converter-secondary bg-clip-text text-transparent">
              AllConvertor Pro
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <SearchBox onSearch={handleSearch} className="w-full sm:w-64" />
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(true)} 
                className="hidden sm:flex"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              
              <ThemeToggle />
              
              <Button variant="default" asChild>
                <Link to="/feedback">Feedback</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
