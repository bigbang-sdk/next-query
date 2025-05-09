import { cursive } from "@/main/utils/fonts";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const HomeMain = () => {
  return (
    <div className="min-h-[400px] py-20 flex flex-1 flex-col items-center justify-center gap-y-5 text-center">
      <p className="text-4xl font-semibold">
        <span className={(cn(""), cursive.className)}> One Library, Multiple Patterns</span>
      </p>
      <p className="text-2xl text-subtext max-w-[600px] text-center font-medium px-5">
        Next Query is a data-fetching library for Next.js that simplifies the process of retrieving data in both Server and Client Components.
      </p>
      <div className="flex items-center justify-center mt-3">
        <Link href="/docs">
          <Button className="">
            <span className="pl-2">Get Started</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
