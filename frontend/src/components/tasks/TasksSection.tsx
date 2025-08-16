import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTasks, setLoading, setError } from "../../state/tasksSlice";
import { useAppSelector } from "../../state/store";
import type { AppDispatch } from "../../state/store";
import { BASE_URL } from "@/lib/constants";

export default function TasksSection() {
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
      const res = await axios.get(`${BASE_URL}/api/tasks/`, {
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
      await axios.post(`${BASE_URL}/api/tasks/`, data, {
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
      await axios.put(`${BASE_URL}/api/tasks/${editTask.id}/`, data, {
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
      await axios.delete(`${BASE_URL}/api/tasks/${id}/`, {
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
      await axios.patch(`${BASE_URL}/api/tasks/${id}/`, { is_completed: completed }, {
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
    <div className="w-full p-6 space-y-6">
      <header className="mb-2">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <p className="text-muted-foreground">
          Add, edit, and manage your tasks.
        </p>
      </header>
      
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
  );
}
