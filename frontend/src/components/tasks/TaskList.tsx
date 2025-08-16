import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteTaskDialog from "./DeleteTaskDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TaskList({ tasks, onEdit, onDelete, onToggle }: {
  tasks: Array<{ id: number; title: string; is_completed: boolean }>;
  onEdit: (task: { id: number; title: string; is_completed: boolean }) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}) {
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openDeleteDialog = (id: number) => setDeleteId(id);
  const closeDeleteDialog = () => setDeleteId(null);
  const confirmDelete = () => {
    if (deleteId !== null) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <ScrollArea className="w-full h-[350px] md:h-[400px] rounded">
        <ul className="space-y-2 w-full pr-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`border rounded p-3 flex flex-col md:flex-row justify-between items-start md:items-center shadow hover:shadow-lg transition ${task.is_completed ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-900'}`}
            >
              <div className="flex items-center gap-2 w-full">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={e => onToggle(task.id, e.target.checked)}
                  className="w-5 h-5 accent-green-600 cursor-pointer flex-shrink-0"
                  aria-label={task.is_completed ? "Mark as pending" : "Mark as completed"}
                />
                <span className="font-semibold text-lg text-gray-900 dark:text-white truncate max-w-[12rem] md:max-w-[20rem]">
                  {task.title}
                </span>
                <div className="flex gap-2 ml-auto">
                  <Button size="sm" variant="outline" onClick={() => onEdit(task)} aria-label="Edit">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => openDeleteDialog(task.id)} aria-label="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <DeleteTaskDialog
        open={deleteId !== null}
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      />
    </>
  );
}
