import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function DeleteTaskDialog({ open, onConfirm, onCancel }: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={v => !v && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="mb-4">Are you sure you want to delete this task? This action cannot be undone.</div>
        <div className="flex gap-2 justify-end">
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
