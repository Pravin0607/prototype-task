import { Link } from "react-router";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../theme-provider";


export default function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  return (
    <header className={`w-full py-4 px-6 flex items-center justify-between shadow ${isDark ? "bg-gray-950 text-white" : "bg-blue-900 text-white"}`}>
      <Link to="/" className="text-2xl font-bold tracking-wide">Task Prototype</Link>
      <nav className="space-x-4 flex items-center">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="bg-transparent border-none outline-none mr-4"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/signup" className="hover:underline">Sign Up</Link>
      </nav>
    </header>
  );
}
