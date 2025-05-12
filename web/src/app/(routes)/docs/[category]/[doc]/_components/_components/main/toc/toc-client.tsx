"use client";
import { NestedList } from "../../../_utils/extract-toc";
import Link from "next/link";
import { cn } from "@/shadcn/lib/utils";
import { useTocStore } from "@/main/hooks/use-toc-store";
import { useEffect } from "react";
import { throttle } from "@tanstack/react-pacer/throttler";

export const TocClient = ({ hashList, children }: { hashList: string[]; children: React.ReactNode }) => {
  const { setActiveHash } = useTocStore();

  useEffect(() => {
    setActiveHash(hashList.length > 0 ? hashList[0] : null);
  }, [hashList, setActiveHash]);

  const throttledSet = throttle(
    (id: string) => {
      setActiveHash(id);
    },
    {
      wait: 1000 / 30,
      leading: true,
      trailing: true,
    }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);

        if (visible[0]) throttledSet(visible[0].target.id);
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      }
    );

    const elements = hashList.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [hashList, throttledSet]);

  return <>{children}</>;
};

export const ListItem = ({ item }: { item: NestedList }) => {
  const { activeHash } = useTocStore();

  return (
    <Item
      item={item}
      isActive={activeHash === item.hash}
    />
  );
};

const Item = ({ item, isActive }: { item: NestedList; isActive: boolean }) => {
  return (
    <Link
      href={`#${item.hash}`}
      className={cn("mb-2 text-sm hover:text-text", isActive ? "text-text font-medium" : "text-subtext")}
    >
      {item.text}
    </Link>
  );
};
