"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shadcn/lib/utils";
import { Home, BookOpenText } from "lucide-react";
import { TbBrandGithub } from "react-icons/tb";

const links = [
  { title: "Home", href: "/", icon: <Home className="w-5 h-5 md:w-4 md:h-4" /> },
  { title: "Documentation", href: "/docs", icon: <BookOpenText className="w-5 h-5 md:w-4 md:h-4" /> },
  { title: "Github", href: "https://github.com/bigbang-sdk/next-query", icon: <TbBrandGithub className="w-5 h-5 md:w-4 md:h-4" /> },
];

const getFirstPathSegment = (url: string) => url.split("/").filter(Boolean)[0] || "";

export const HeaderLinks = () => {
  const pathname = usePathname();
  const current = getFirstPathSegment(pathname);

  return (
    <div className="flex items-center gap-8">
      {links.map(({ title, href, icon }) => {
        const isExternal = href.startsWith("http");
        const isActive = getFirstPathSegment(href) === current;

        return (
          <Link
            key={href}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={cn("text-sm text-subtext hover:text-text flex items-center gap-2", isActive && !isExternal && "text-text")}
          >
            {icon}
            <span className="hidden md:block">{title}</span>
          </Link>
        );
      })}
    </div>
  );
};
