import { logout } from "@/state/sessionSlice";
import {
  Sidebar,
  SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
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
import { useState } from "react";

const sidebarLinks = [
  { name: "Home", icon: <Home className="w-5 h-5" />, route: "/" },
  { name: "Tasks", icon: <ListTodo className="w-5 h-5" />, route: "/dashboard/tasks" },
  { name: "Logout", icon: <LogOut className="w-5 h-5" />, route: "/logout" },
];

export function AppSidebar() {
  const dispatch = useDispatch<AppDispatch>();
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
              <Sidebar>
            <SidebarHeader>
              <span className="text-xl font-bold tracking-wide">Admin Panel</span>
              {/* show button for theme */}
              <Button onClick={toggleTheme}>
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
  )
}