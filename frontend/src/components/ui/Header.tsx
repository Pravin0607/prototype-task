import { Link } from "react-router";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggleTheme = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark", !dark);
  };
  return (
    <header className="w-full bg-blue-900 dark:bg-gray-950 text-white py-4 px-6 flex items-center justify-between shadow">
      <Link to="/" className="text-2xl font-bold tracking-wide">Task Prototype</Link>
      <nav className="space-x-4 flex items-center">
        <button
          onClick={toggleTheme}
          className="bg-transparent border-none outline-none mr-4"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/signup" className="hover:underline">Sign Up</Link>
      </nav>
    </header>
  );
}
