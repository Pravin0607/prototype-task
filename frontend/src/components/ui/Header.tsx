import { Link } from "react-router";

export default function Header() {
  return (
    <header className="w-full bg-blue-900 dark:bg-gray-950 text-white py-4 px-6 flex items-center justify-between shadow">
      <Link to="/" className="text-2xl font-bold tracking-wide">Task Prototype</Link>
      <nav className="space-x-4">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/signup" className="hover:underline">Sign Up</Link>
      </nav>
    </header>
  );
}
