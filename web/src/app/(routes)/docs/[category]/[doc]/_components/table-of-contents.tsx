"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useDebouncer } from "@tanstack/react-pacer/debouncer";
import { cn } from "@/shadcn/lib/utils";
import type { NestedList } from "../_utils/extract-toc";

function getHashList(items: NestedList[]): string[] {
  return items.flatMap((item) => [item.hash, ...getHashList(item.children || [])]);
}

export const TableOfContents = ({ nestedList }: { nestedList: NestedList[] }) => {
  const [activeHash, setActiveHash] = useState<string | null>(nestedList[0]?.hash ?? null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const debouncedSetActiveHash = useDebouncer(setActiveHash, { wait: 50 });

  const hashList = useMemo(() => getHashList(nestedList), [nestedList]);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);

      if (visible.length > 0) {
        debouncedSetActiveHash.maybeExecute(visible[0].target.id);
      }
    },
    [debouncedSetActiveHash]
  );

  useEffect(() => {
    const elements = hashList.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "0px 0px -70% 0px",
      threshold: 0.1,
    });

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hashList, handleIntersect]);

  return (
    <aside className="sticky top-24 h-[calc(100vh-6rem)] w-[16rem] overflow-y-auto border-l py-6 pl-5 pr-5 hidden lg:block">
      <p className="mb-2 text-sm font-semibold">On this page</p>
      <nav className="flex flex-col">
        <List items={nestedList} activeHash={activeHash} />
      </nav>
    </aside>
  );
};

const List = ({ items, activeHash, depth = 0 }: { items: NestedList[]; activeHash: string | null; depth?: number }) => (
  <>
    {items.map((item) => (
      <div key={item.hash} className={cn("flex flex-col", depth > 0 && "ml-3")}>
        <Link href={`#${item.hash}`} className={cn("mb-2 text-sm hover:text-primary", activeHash === item.hash ? "text-primary font-medium" : "text-subtext")}>
          {item.text}
        </Link>
        {item.children?.length > 0 && <List items={item.children} activeHash={activeHash} depth={depth + 1} />}
      </div>
    ))}
  </>
);
