import { logout } from "@/state/sessionSlice";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  ];
  
  return (
    <Sidebar>
      <SidebarHeader>
        {/* name of the app */}
        
        <span className="text-xl font-bold tracking-wide">Admin Panel</span>
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
      <SidebarFooter>
        {/* add the logout and theme buttton here */}
        <Button onClick={toggleTheme} variant="outline" className="w-full mt-2">
          {dark ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
          Toggle Theme
        </Button>
        <Button onClick={handleLogout} variant="destructive" className="w-full">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}