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
  confirm_password: z.string().min(4),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
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
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
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
            {/* First/Last name side by side on md+, stacked on mobile */}
            <div className="flex flex-col gap-2 w-full md:flex-row md:gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="first_name" className="text-sm font-medium">First Name</label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="First Name"
                  {...register("first_name")}
                  disabled={isSubmitting}
                  className="w-full"
                />
                {errors.first_name && <div className="text-red-500 text-xs">{errors.first_name.message}</div>}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="last_name" className="text-sm font-medium">Last Name</label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Last Name"
                  {...register("last_name")}
                  disabled={isSubmitting}
                  className="w-full"
                />
                {errors.last_name && <div className="text-red-500 text-xs">{errors.last_name.message}</div>}
              </div>
            </div>

            {/* Email full width always */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                disabled={isSubmitting}
                className="w-full"
              />
              {errors.email && <div className="text-red-500 text-xs">{errors.email.message}</div>}
            </div>

            {/* Password/Confirm side by side on md+, stacked on mobile */}
            <div className="flex flex-col gap-2 w-full md:flex-row md:gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  disabled={isSubmitting}
                  className="w-full"
                />
                {errors.password && <div className="text-red-500 text-xs">{errors.password.message}</div>}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="confirm_password" className="text-sm font-medium">Confirm Password</label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirm_password")}
                  disabled={isSubmitting}
                  className="w-full"
                />
                {errors.confirm_password && <div className="text-red-500 text-xs">{errors.confirm_password.message}</div>}
              </div>
            </div>

            <Button type="submit" className="w-full font-semibold text-lg mt-2" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="text-center mt-2">
              <span className="text-sm">Already have an account? </span>
              <a href="/login" className="text-blue-600 hover:underline text-sm">Login</a>
            </div>
            {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
            {success && <div className="text-green-600 text-xs mt-2">{success}</div>}
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
