import { SidebarProvider } from "@/shadcn/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar/sidebar";
import "@/main/css/docs.css";
import { AppSidebarContent } from "./_components/sidebar/components/sidebar-content";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper border-x">
      <SidebarProvider className="flex">
        <div className="w-fit h-fit sticky top-14">
          <AppSidebar>
            <AppSidebarContent />
          </AppSidebar>
        </div>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarProvider>
    </div>
  );
}
