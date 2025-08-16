import { logout } from "@/state/sessionSlice";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, ListTodo, LogOut, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router";
import type { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { useState, type JSX } from "react";

type SidebarView = 'home' | 'tasks';

interface SidebarLink {
  name: string;
  icon: JSX.Element;
  view?: SidebarView;
  action?: () => void;
}

interface AppSidebarProps {
  onNavigate: (view: SidebarView) => void;
  activeView: SidebarView;
}

export function AppSidebar({ onNavigate, activeView }: AppSidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
    dispatch(logout());
    navigate("/login");
  };
  
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggleTheme = () => {
    setDark((d) => !d);
    document.documentElement.classList.toggle("dark", !dark);
  };
  
  const sidebarLinks: SidebarLink[] = [
    { name: "Home", icon: <Home className="w-5 h-5" />, view: 'home' },
    { name: "Tasks", icon: <ListTodo className="w-5 h-5" />, view: 'tasks' },
    { name: "Logout", icon: <LogOut className="w-5 h-5" />, action: handleLogout },
  ];
  
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-xl font-bold tracking-wide">Admin Panel</span>
        <Button onClick={toggleTheme} size="sm" variant="ghost">
          {dark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          <span className="ml-2">Toggle Theme</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarLinks.map((link) => (
            <SidebarMenuItem key={link.name}>
              <SidebarMenuButton 
                onClick={link.action || (() => link.view && onNavigate(link.view))}
                className={link.view === activeView ? "bg-secondary" : ""}
              >
                {link.icon}<span>{link.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}