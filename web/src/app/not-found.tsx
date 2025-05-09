import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/shadcn/lib/utils";

export default function NotFound() {
  const titleClass = "text-[8rem] font-bold";
  return (
    <div className="flex flex-1 flex-col items-center justify-center pattern-bg container-wrapper border-x">
      <div className="flex items-center justify-center">
        <p className={cn(titleClass, "pb-0 rotate-12")}>O</p>
        <p className={cn(titleClass, "pb-5 -rotate-12")}>O</p>
        <p className={cn(titleClass, "pt-6 rotate-12")}>P</p>
        <p className={cn(titleClass, "pb-5 -rotate-12")}>S</p>
        <p className={cn(titleClass, "pt-5 -rotate-12")}>!</p>
      </div>

      <p className="text-xl -mt-6">{"You've stumbled upon a page that doesn't exist."}</p>
      <Link href="/" className="mt-10 flex items-center gap-1 underline underline-offset-4 text-muted-foreground hover:text-foreground">
        Return Home
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
