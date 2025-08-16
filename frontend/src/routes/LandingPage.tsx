import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {Link} from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl text-center"
      >
        <h1 className="text-4xl font-bold mb-6">Welcome to Task Prototype</h1>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
          Manage your users, services, and tasks with a modern, animated dashboard.<br />
          Secure authentication, responsive UI, and beautiful Shadcn components.
        </p>
        <Link to="/login">
          <Button className="px-8 py-3 text-lg font-semibold">Get Started</Button>
        </Link>
      </motion.div>
    </div>
  );
}
