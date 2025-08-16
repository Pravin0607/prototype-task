import EditTaskModal from "@/components/tasks/EditTaskModal";


import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTasks, setLoading, setError } from "../state/tasksSlice";
import { useAppSelector } from "../state/store";
import type { AppDispatch } from "../state/store";
import {
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { AppSidebar } from "@/components/shared/app-sidebar";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import toast from "react-hot-toast";



export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useAppSelector(state => state.tasks.items);
  const loading = useAppSelector(state => state.tasks.loading);
  const error = useAppSelector(state => state.tasks.error);
  const [formLoading, setFormLoading] = useState(false);
  const [editTask, setEditTask] = useState<null | { id: number; title: string }>();
  const [modalOpen, setModalOpen] = useState(false);

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
      toast.error("Failed to fetch tasks");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add Task
  const handleAddTask = async (data: { title: string }) => {
    setFormLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.post("http://127.0.0.1:8000/api/tasks/", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task added!");
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    } finally {
      setFormLoading(false);
    }
  };

  // Edit Task
  const handleEditTask = (task: { id: number; title: string }) => {
    setEditTask(task);
    setModalOpen(true);
  };

  // Update Task
  const handleUpdateTask = async (data: { title: string }) => {
    if (!editTask) return;
    setFormLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(`http://127.0.0.1:8000/api/tasks/${editTask.id}/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task updated!");
      setEditTask(null);
      setModalOpen(false);
      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id: number) => {
    setFormLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task deleted!");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setFormLoading(false);
    }
  };

  // Toggle Task Completion
  const handleToggleTask = async (id: number, completed: boolean) => {
    setFormLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.patch(`http://127.0.0.1:8000/api/tasks/${id}/`, { is_completed: completed }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(completed ? "Task marked as completed!" : "Task marked as pending!");
      fetchTasks();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to update task status");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-background w-full">
        <AppSidebar/>
        <main className="flex-1 w-full p-2 flex flex-col gap-4">
        <SidebarTrigger/>        
          <Card className="p-6 shadow-lg rounded-xl mb-4">
            <h2 className="text-2xl font-bold mb-4">Add Task</h2>
            <TaskForm
              onSubmit={handleAddTask}
              loading={formLoading}
            />
          </Card>
          <Card className="p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            )}
          </Card>
        </main>
        {editTask && (
          <EditTaskModal
            open={modalOpen}
            onClose={() => { setEditTask(null); setModalOpen(false); }}
            onSubmit={handleUpdateTask}
            initial={{ title: editTask.title }}
            loading={formLoading}
          />
        )}
      </div>
    </SidebarProvider>
  );
}
