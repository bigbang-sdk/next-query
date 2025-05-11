import { cn } from "@/shadcn/lib/utils";
import { JSXElementConstructor } from "react";
import { ReactElement } from "react";

export async function Content({ content }: { content: ReactElement<unknown, string | JSXElementConstructor<unknown>> }) {
  const proseClassName = "max-w-full prose dark:prose-invert prose-neutral prose-a:text-blue-500 prose-a:hover:text-blue-600 prose-a:no-underline";

  return (
    <div className={cn("flex-1 py-2 px-4 md:px-10", proseClassName)}>
      <div
        className="w-full my-0 py-0"
        id="doc-content"
      >
        {content}
      </div>
    </div>
  );
}
