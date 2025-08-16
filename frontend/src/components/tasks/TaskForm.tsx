import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TaskForm({ onSubmit, initial, loading }: {
  onSubmit: (data: { title: string }) => void;
  initial?: { title: string };
  loading?: boolean;
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initial || { title: "" }
  });

  return (
    <form
      className="flex flex-col md:flex-row gap-2 w-full"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <Input
        {...register("title", { required: true })}
        placeholder="Task title"
        className="flex-1"
        disabled={loading}
      />
      <Button type="submit" disabled={loading} className="md:w-auto w-full">
        {loading ? "Saving..." : initial ? "Update" : "Add Task"}
      </Button>
    </form>
  );
}
