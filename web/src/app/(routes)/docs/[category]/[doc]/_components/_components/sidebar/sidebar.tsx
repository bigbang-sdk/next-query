"use client";
import { Sidebar, useSidebar } from "@/shadcn/components/ui/sidebar";
import { AppSidebarContent } from "./components/sidebar-content";

export function AppSidebar() {
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "none"}
      className="border-r h-[calc(100vh-3.5rem)] py-2 hidden md:block"
    >
      <AppSidebarContent />
    </Sidebar>
  );
}
