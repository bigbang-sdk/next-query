"use client";
import * as React from "react";
import { SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/shadcn/components/ui/sidebar";
import { Doc, DocCategory, docList } from "@/main/docs/docs-list";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shadcn/lib/utils";
import { TbDatabase, TbLeaf } from "react-icons/tb";
import { RiExchange2Line } from "react-icons/ri";
import { LucidePackageOpen } from "lucide-react";
import { getHash } from "@/main/utils/hash";

export const AppSidebarContent = () => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <p className="text-sm font-semibold px-2 pt-6 block md:hidden">Documentation</p>
          {docList.map((category, categoryIndex) => (
            <SidebarMenuItem key={categoryIndex}>
              <p className="text-xs text-subtext font-semibold px-2 pt-2 pb-1">{category.categoryTitle}</p>
              {category.docs?.length ? (
                <SidebarMenuSub>
                  {category.docs.map((doc, docIndex) => (
                    <SidebarMenuSubItem key={docIndex}>
                      <ButtonOuterDiv
                        category={category}
                        doc={doc}
                      />
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

const SubtitleList = {
  Fresh: {
    class: "bg-green-500/20 text-green-500",
    icon: <TbLeaf className="w-3 h-3 " />,
  },
  Cached: {
    class: "bg-purple-500/20 text-purple-500",
    icon: <TbDatabase className="w-3 h-3 " />,
  },
  SWR: {
    class: "bg-cyan-500/20 text-cyan-500",
    icon: <RiExchange2Line className="w-3 h-3 " />,
  },
  "Start here": {
    class: "bg-blue-500/20 text-blue-500",
    icon: <LucidePackageOpen className="w-3 h-3 " />,
  },
};

const ButtonOuterDiv = ({ category, doc }: { category: DocCategory; doc: Doc }) => {
  const pathname = usePathname();

  const href = `/docs/${category.categorySlug}/${doc.docSlug}`;

  const isActive = pathname === href || (pathname === "/docs" && href === "/docs/getting-started/overview");

  return (
    <ButtonDiv
      isActive={isActive}
      href={href}
      doc={doc}
    />
  );
};

const ButtonDiv = ({ isActive, href, doc }: { isActive: boolean; href: string; doc: Doc }) => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenuSubButton
      asChild
      className={cn("py-4")}
      isActive={isActive}
      id={getHash(href)}
    >
      <Link
        href={href}
        onClick={() => (isMobile ? setOpenMobile(false) : null)}
      >
        <div className="flex gap-x-2 items-center justify-between w-full">
          <span className="text-sm">{doc.docTitle}</span>
          {doc.docSubtitle && (
            <div className={cn("text-xs text-subtext flex gap-x-1 items-center px-2 py-0.5 rounded-md", SubtitleList[doc.docSubtitle as keyof typeof SubtitleList].class)}>
              {SubtitleList[doc.docSubtitle as keyof typeof SubtitleList].icon}
              <span>{doc.docSubtitle}</span>
            </div>
          )}
        </div>
      </Link>
    </SidebarMenuSubButton>
  );
};
