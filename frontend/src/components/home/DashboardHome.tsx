import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function DashboardHome() {
  const [showOverlay, setShowOverlay] = useState(true);
  
  useEffect(() => {
    // Hide overlay after 3 seconds
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 3000);
    
    // Clean up timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  
  const stats = [
    { title: "Total Tasks", value: "24", color: "bg-blue-100 dark:bg-blue-900" },
    { title: "Completed", value: "16", color: "bg-green-100 dark:bg-green-900" },
    { title: "Pending", value: "8", color: "bg-amber-100 dark:bg-amber-900" },
    { title: "Overdue", value: "2", color: "bg-red-100 dark:bg-red-900" }
  ];

  return (
    <div className="w-full p-6 relative">
      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border"
            >
              <h2 className="text-3xl font-bold mb-2">Dummy Analytics</h2>
              <p className="text-muted-foreground">Loading dashboard data...</p>
              <div className="mt-4 flex justify-center items-center space-x-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.6,
                    delay: 0
                  }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.6,
                    delay: 0.15
                  }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.6,
                    delay: 0.3
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your task management dashboard. Here's an overview of your tasks.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className={`p-6 ${stat.color} border-none shadow-md`}>
              <h3 className="font-medium text-lg">{stat.title}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="p-3 bg-background rounded-md border border-border">
              <div className="flex justify-between">
                <span className="font-medium">Task "Update documentation" completed</span>
                <span className="text-muted-foreground text-sm">Today at 2:30 PM</span>
              </div>
            </li>
            <li className="p-3 bg-background rounded-md border border-border">
              <div className="flex justify-between">
                <span className="font-medium">Task "Review pull request" added</span>
                <span className="text-muted-foreground text-sm">Today at 11:20 AM</span>
              </div>
            </li>
            <li className="p-3 bg-background rounded-md border border-border">
              <div className="flex justify-between">
                <span className="font-medium">Task "Fix login bug" updated</span>
                <span className="text-muted-foreground text-sm">Yesterday at 4:15 PM</span>
              </div>
            </li>
          </ul>
        </Card>

        <Card className="p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
          <ul className="space-y-4">
            <li className="p-3 bg-background rounded-md border border-border">
              <div className="flex justify-between">
                <span className="font-medium">Submit project proposal</span>
                <span className="text-red-500 text-sm">Tomorrow</span>
              </div>
            </li>
            <li className="p-3 bg-background rounded-md border border-border">
              <div className="flex justify-between">
                <span className="font-medium">Client meeting preparation</span>
                <span className="text-amber-500 text-sm">In 2 days</span>
              </div>
            </li>
            <li className="p-3 bg-background rounded-md border border-border">
              <div className="flex justify-between">
                <span className="font-medium">Weekly report</span>
                <span className="text-blue-500 text-sm">In 5 days</span>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
