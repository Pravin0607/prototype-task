import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {Link} from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <h1 className="text-5xl font-extrabold mb-6 text-blue-900 dark:text-white">Empower Your Business</h1>
          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
            Modern solutions for web, mobile, and digital marketing. <br />
            Streamline your workflow and grow your brand with our all-in-one platform.
          </p>
          <Link to="/login">
            <Button className="px-8 py-3 text-lg font-semibold">Get Started</Button>
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg shadow-md bg-blue-50 dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">Web Development</h3>
            <p className="text-gray-600 dark:text-gray-200">Custom websites, portals, and dashboards built for speed, security, and scalability.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-blue-50 dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">Mobile App Development</h3>
            <p className="text-gray-600 dark:text-gray-200">iOS and Android apps designed for performance and delightful user experiences.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-blue-50 dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">Digital Marketing</h3>
            <p className="text-gray-600 dark:text-gray-200">SEO, social media, and campaigns to boost your online presence and reach new customers.</p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-start">
            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">Why Choose Us?</h4>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Fast, secure, and scalable technology stack</li>
              <li>Beautiful, responsive UI for all devices</li>
              <li>Integrated authentication and user management</li>
              <li>Expert support and ongoing updates</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-start">
            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">Platform Features</h4>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Task and project management dashboard</li>
              <li>Real-time notifications and analytics</li>
              <li>Easy integration with your existing tools</li>
              <li>Mobile-first, accessible design</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
