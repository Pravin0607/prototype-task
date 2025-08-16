import { useState } from "react";
import {
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import TasksSection from "@/components/tasks/TasksSection";
import DashboardHome from "@/components/home/DashboardHome";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<'home' | 'tasks'>('home');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-background w-full">
        <AppSidebar onNavigate={setActiveView} activeView={activeView} />
        <main className="flex-1 w-full">
          <SidebarTrigger className="p-2" />
          {activeView === 'home' ? (
            <DashboardHome />
          ) : (
            <TasksSection />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
