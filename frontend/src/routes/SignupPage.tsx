import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
});

type SignupForm = z.infer<typeof schema>;

export default function SignupPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: SignupForm) => {
    setError("");
    setSuccess("");
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", data);
      setSuccess("Signup successful! You can now login.");
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
            <Input
              type="text"
              placeholder="First Name"
              {...register("first_name")}
              disabled={isSubmitting}
            />
            {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name.message}</div>}
            <Input
              type="text"
              placeholder="Last Name"
              {...register("last_name")}
              disabled={isSubmitting}
            />
            {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name.message}</div>}
            <Button type="submit" className="w-full font-semibold text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
