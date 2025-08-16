

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTasks, setLoading, setError } from "../state/tasksSlice";
import { useAppSelector } from "../state/store";
import type { AppDispatch } from "../state/store";
import {
  SidebarProvider
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { AppSidebar } from "@/components/shared/app-sidebar";



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

  return (
    <SidebarProvider>
  <div className="min-h-screen flex bg-background w-full">
    <AppSidebar/>
            <main className="flex-1 w-full p-2">
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
      </div>
    </SidebarProvider>
  );
}
