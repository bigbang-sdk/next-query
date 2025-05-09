"use client";
import * as React from "react";
import { SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/shadcn/components/ui/sidebar";
import { docList } from "@/main/docs/docs-list";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shadcn/lib/utils";
import { TbDatabase, TbLeaf } from "react-icons/tb";
import { RiExchange2Line } from "react-icons/ri";
import { LucidePackageOpen } from "lucide-react";

export const AppSidebarContent = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (pathname == "/docs" && path == "/docs/getting-started/overview") {
      return true;
    }
    return pathname === path;
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <p className="text-sm font-semibold px-2 pt-6 block md:hidden">Documentation</p>
          {docList.map((category, index) => (
            <SidebarMenuItem key={index}>
              <p className="text-xs text-muted-foreground font-semibold px-2 pt-2 pb-1">{category.categoryTitle}</p>
              {category.docs?.length ? (
                <SidebarMenuSub>
                  {category.docs.map((doc, index2) => (
                    <SidebarMenuSubItem key={index2}>
                      <SidebarMenuSubButton asChild isActive={isActive(`/docs/${category.categorySlug}/${doc.docSlug}`)} className={cn(doc.docSubtitle ? "py-4" : "py-4")}>
                        <Link href={`/docs/${category.categorySlug}/${doc.docSlug}`}>
                          <div className="flex gap-x-2 items-center justify-between w-full">
                            <span className="text-sm">{doc.docTitle}</span>
                            {doc.docSubtitle && (
                              <div
                                className={cn(
                                  "text-xs text-muted-foreground flex gap-x-1 items-center px-2 py-0.5 rounded-md",
                                  doc.docSubtitle == "Fresh" && "bg-green-500/20 text-green-500",
                                  doc.docSubtitle == "Cached" && "bg-purple-500/20 text-purple-500",
                                  doc.docSubtitle == "SWR" && "bg-cyan-500/20 text-cyan-500",
                                  doc.docSubtitle == "Start here" && "bg-blue-500/20 text-blue-500"
                                )}
                              >
                                {doc.docSubtitle == "Fresh" && <TbLeaf className="w-3 h-3 " />}
                                {doc.docSubtitle == "Cached" && <TbDatabase className="w-3 h-3 " />}
                                {doc.docSubtitle == "SWR" && <RiExchange2Line className="w-3 h-3 " />}
                                {doc.docSubtitle == "Start here" && <LucidePackageOpen className="w-3 h-3 " />}
                                <span className=""> {doc.docSubtitle}</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </SidebarMenuSubButton>
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
