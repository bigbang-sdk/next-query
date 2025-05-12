import { cn } from "@/shadcn/lib/utils";

export const VerticalDivs = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={cn(className, "flex flex-col gap-2 unstyled")}>{children}</div>;
};
