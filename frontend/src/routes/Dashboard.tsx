

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../state/sessionSlice";
import { setTasks, setLoading, setError } from "../state/tasksSlice";
import { useAppSelector } from "../state/store";
import type { AppDispatch } from "../state/store";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Home, ListTodo, LogOut, Sun, Moon } from "lucide-react";

const sidebarLinks = [
  { name: "Home", icon: <Home className="w-5 h-5" />, route: "/" },
  { name: "Tasks", icon: <ListTodo className="w-5 h-5" />, route: "/dashboard/tasks" },
  { name: "Logout", icon: <LogOut className="w-5 h-5" />, route: "/logout" },
];

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useAppSelector(state => state.tasks.items);
  const loading = useAppSelector(state => state.tasks.loading);
  const error = useAppSelector(state => state.tasks.error);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://127.0.0.1:8000/api/tasks/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setTasks(res.data));
      } catch {
        dispatch(setError("Failed to fetch tasks"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchTasks();
  }, [dispatch]);

  // Add navigation for logout
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    navigate("/login");
  };

  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggleTheme = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark", !dark);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <div className="w-full flex justify-end items-center px-6 py-2">
          <button
            onClick={toggleTheme}
            className="bg-transparent border-none outline-none"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex flex-1">
          <Sidebar>
            <SidebarHeader>
              <span className="text-xl font-bold tracking-wide">Admin Panel</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {sidebarLinks.map((link) => (
                  <SidebarMenuItem key={link.name}>
                    {link.name === "Logout" ? (
                      <SidebarMenuButton onClick={handleLogout}>
                        {link.icon}<span>{link.name}</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton>{link.icon}<span>{link.name}</span></SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <main className="flex-1 p-10">
              <Card className="p-8 shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Tasks</h2>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : (
                  <ul className="space-y-2">
                    {tasks.map((task) => (
                      <li key={task.id} className="border rounded p-3 flex justify-between items-center">
                        <span>{task.title}</span>
                        <span className={task.is_completed ? "text-green-600" : "text-yellow-600"}>
                          {task.is_completed ? "Completed" : "Pending"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
