import { BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/shadcn/components/ui/breadcrumb";
import { BreadcrumbItem } from "@/shadcn/components/ui/breadcrumb";
import { Separator } from "@/shadcn/components/ui/separator";
import { Breadcrumb } from "@/shadcn/components/ui/breadcrumb";
import { SidebarTrigger } from "@/shadcn/components/ui/sidebar";
import { docList } from "@/main/docs/docs-list";

export const Dock = ({ category, doc }: { category: string; doc: string }) => {
  return (
    <div className="flex items-center gap-2">
      <SidebarTrigger className="block md:hidden" />
      <Separator
        orientation="vertical"
        className="mr-2 h-4 block md:hidden"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-subtext">{docList.find((item) => item.categorySlug === category)?.categoryTitle || category}</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{docList.find((item) => item.categorySlug === category)?.docs?.find((item) => item.docSlug === doc)?.docTitle || doc}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
