import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function Section({
  children,
  className,
  fullHeight = true,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "w-full px-4 md:px-6 lg:px-8 py-12",
        fullHeight ? "min-h-screen" : "min-h-[50vh]",
        className
      )}
      {...props}
    >
      <div className="container mx-auto">{children}</div>
    </section>
  );
}
