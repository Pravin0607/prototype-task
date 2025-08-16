import { Link } from "react-router";
import { Sun, Moon, LogOut, Menu, X } from "lucide-react";
import { useTheme } from "../theme-provider";
import { useAppSelector } from "@/state/store";
import { handleLogout } from "@/utils/auth";
import { useState } from "react";


export default function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const isAuthenticated = useAppSelector(state => state.session.isAuthenticated);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const onLogout = () => {
    handleLogout();
    window.location.href = '/login';
    setMobileMenuOpen(false);
  };
  
  return (
    <header className={`w-full py-3 px-4 md:px-6 md:py-4 flex items-center justify-between shadow ${isDark ? "bg-gray-950 text-white" : "bg-blue-900 text-white"} relative`}>
      {/* Logo - smaller on mobile */}
      <Link to="/" className="text-lg md:text-2xl font-bold tracking-wide truncate max-w-[180px] md:max-w-none">
        Task Prototype
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:items-center md:space-x-4">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="bg-transparent border-none outline-none p-2 rounded-full hover:bg-white/10"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="hover:underline px-2 py-1">Dashboard</Link>
            <button 
              onClick={onLogout}
              className="flex items-center hover:underline px-2 py-1"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline px-2 py-1">Login</Link>
            <Link to="/signup" className="hover:underline px-2 py-1">Sign Up</Link>
          </>
        )}
      </nav>
      
      {/* Mobile Menu Button */}
      <div className="flex items-center space-x-2 md:hidden">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="bg-transparent border-none outline-none p-1.5 rounded-full hover:bg-white/10"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-transparent border-none outline-none p-1.5 rounded-full hover:bg-white/10"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-card text-card-foreground shadow-lg py-2 border-t border-border z-50 md:hidden">
          {isAuthenticated ? (
            <div className="flex flex-col">
              <Link 
                to="/dashboard" 
                className="px-6 py-3 hover:bg-muted w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button 
                onClick={onLogout}
                className="px-6 py-3 hover:bg-muted w-full text-left flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <Link 
                to="/login" 
                className="px-6 py-3 hover:bg-muted w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-3 hover:bg-muted w-full text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
