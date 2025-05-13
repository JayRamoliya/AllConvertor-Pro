
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBox from "./SearchBox";

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
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
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
            <span className="text-2xl font-bold bg-gradient-to-r from-converter-primary to-converter-secondary bg-clip-text text-transparent">
              AllConvertor Pro
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop search */}
          <div className="relative hidden md:block">
            <SearchBox onSearch={handleSearch} />
          </div>

          {/* Mobile search button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          {/* Mobile search overlay */}
          {isSearchOpen && (
            <div className="absolute top-16 left-0 right-0 p-2 bg-white shadow-md z-40 md:hidden">
              <SearchBox onSearch={handleSearch} />
            </div>
          )}

          <Button asChild variant="default" className="hidden md:flex bg-gradient-to-r from-converter-primary to-converter-secondary hover:from-converter-primary/90 hover:to-converter-secondary/90">
            <Link to="/feedback">
              Feedback
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
