export default function Footer() {
  return (
    <footer className="w-full bg-blue-900 dark:bg-gray-950 text-white py-4 px-6 text-center mt-auto">
      <span className="text-sm">&copy; {new Date().getFullYear()} Task Prototype. All rights reserved.</span>
    </footer>
  );
}
