import { SidebarProvider } from "@/shadcn/components/ui/sidebar";
import { AppSidebar } from "./[category]/[doc]/_components/_components/sidebar/sidebar";
import "@/main/css/docs.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper border-x">
      <SidebarProvider className="flex">
        <div className="w-fit h-fit sticky top-14">
          <AppSidebar />
        </div>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarProvider>
    </div>
  );
}
