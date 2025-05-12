import { loadMdx } from "@/app/(routes)/docs/[category]/[doc]/_components/_utils/mdx-loader";
import { notFound } from "next/navigation";
import { Dock } from "./_components/dock/dock";
import { Content } from "./_components/main/content";
import { HighlightThemeLoader } from "./_utils/theme-loader";
import { Doc } from "@/main/docs/docs-list";
import { Toc } from "./_components/main/toc/toc";

export const DocPage = async ({ params }: { params: Promise<{ category: string; doc: string }> }) => {
  const { category, doc } = await params;
  if (!category || !doc) return notFound();

  const { docItem, content, nestedList } = await loadMdx({ category, doc });

  return (
    <>
      <div className="w-full flex flex-col justify-center gap-2 h-10 border-b px-4 md:px-10 sticky top-14 bg-background z-10">
        <Dock
          category={category}
          doc={doc}
        />
      </div>
      <div className="w-full flex">
        <div className="flex flex-1 flex-col min-h-[calc(100vh-2rem)]">
          <ContentHeader docItem={docItem} />
          <Content content={content} />
        </div>
        {nestedList.length > 0 && <Toc nestedList={nestedList} />}
      </div>
      <HighlightThemeLoader />
    </>
  );
};

const ContentHeader = ({ docItem }: { docItem: Doc }) => {
  return (
    <div className="flex flex-col gap-2 border-b px-4 md:px-10 h-22 justify-center">
      <p className="text-3xl font-bold">{docItem.docTitle}</p>
      <span className="text-sm text-subtext">{docItem?.docDescription || ""}</span>
    </div>
  );
};
