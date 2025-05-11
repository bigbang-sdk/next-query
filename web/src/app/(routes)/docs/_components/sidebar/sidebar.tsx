"use client";
import * as React from "react";
import { Sidebar, useSidebar } from "@/shadcn/components/ui/sidebar";

export function AppSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "none"}
      className="border-r h-[calc(100vh-3.5rem)] py-2 hidden md:block"
      {...props}
    >
      {children}
    </Sidebar>
  );
}
