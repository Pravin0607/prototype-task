import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteTaskDialog from "./DeleteTaskDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const taskVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: {
      duration: 0.2,
      height: { duration: 0.2 }
    }
  }
};

const listVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
        <motion.ul
          className="space-y-2 w-full pr-2"
          variants={listVariants}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                layout
                variants={taskVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`border rounded p-3 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition-shadow ${
                  task.is_completed ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-900'
                }`}
              >
                <motion.div 
                  className="flex items-center gap-2 w-full"
                  layout
                >
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={e => onToggle(task.id, e.target.checked)}
                    className="w-5 h-5 accent-green-600 cursor-pointer flex-shrink-0 transition-transform duration-150 hover:scale-110"
                    aria-label={task.is_completed ? "Mark as pending" : "Mark as completed"}
                  />
                  <motion.span 
                    className={`font-semibold text-lg truncate max-w-[12rem] md:max-w-[20rem] ${
                      task.is_completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                    }`}
                    animate={{
                      opacity: task.is_completed ? 0.6 : 1,
                      scale: task.is_completed ? 0.95 : 1
                    }}
                  >
                    {task.title}
                  </motion.span>
                  <div className="flex gap-2 ml-auto">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onEdit(task)} 
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => openDeleteDialog(task.id)} 
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </ScrollArea>
      <DeleteTaskDialog
        open={deleteId !== null}
        onConfirm={confirmDelete}
        onCancel={closeDeleteDialog}
      />
    </>
  );
}
