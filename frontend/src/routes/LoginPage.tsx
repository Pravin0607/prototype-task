
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../state/sessionSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Toggle dark mode
  const toggleTheme = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark", !dark);
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Django expects username as email
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: email,
        password,
      });
      const { access, refresh } = res.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      dispatch(login({ accessToken: access, user: { email } }));
      // Set auto-logout timer based on token expiry (30 min)
      setTimeout(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(logout());
        setError("Session expired. Please login again.");
      }, 30 * 60 * 1000);
      // Redirect to dashboard
      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${dark ? "from-gray-900 to-gray-800" : "from-blue-100 to-white"}`}> 
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className={`p-8 shadow-xl rounded-xl ${dark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full font-semibold text-lg mt-2">
              Login
            </Button>
            <div className="text-center mt-2">
              <span className="text-sm">New user? </span>
              <Link to="/signup" className="text-blue-600 hover:underline text-sm">Register</Link>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
