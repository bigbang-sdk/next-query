"use client";
import * as React from "react";
import { SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/shadcn/components/ui/sidebar";
import { docList } from "@/main/docs/docs-list";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
                      <SidebarMenuSubButton asChild isActive={isActive(`/docs/${category.categorySlug}/${doc.docSlug}`)} className="py-4">
                        <Link href={`/docs/${category.categorySlug}/${doc.docSlug}`}>{doc.docTitle}</Link>
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
