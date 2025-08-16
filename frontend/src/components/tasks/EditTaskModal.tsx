import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskForm from "./TaskForm";

export default function EditTaskModal({ open, onClose, onSubmit, initial, loading }: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string }) => void;
  initial: { title: string };
  loading?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm onSubmit={onSubmit} initial={initial} loading={loading} />
      </DialogContent>
    </Dialog>
  );
}
