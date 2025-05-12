import { Loading } from "@/main/components/global/loading/loading";
import { Suspense } from "react";
import { allDocsPaths, docList } from "@/main/docs/docs-list";
import { Metadata } from "next";
import { DocPage } from "@/app/(routes)/docs/[category]/[doc]/_components/doc-page";

export async function generateMetadata({ params }: { params: Promise<{ category: string; doc: string }> }): Promise<Metadata> {
  const { category, doc } = await params;

  const docCategory = docList.find((item) => item.categorySlug === category);
  const docItem = docCategory?.docs.find((item) => item.docSlug === doc);

  return {
    title: docCategory && docItem ? `${docCategory.categoryTitle}: ${docItem.docTitle} / Next Query` : "Docs /Next Query",
  };
}

export async function generateStaticParams() {
  const filePaths = allDocsPaths();

  return filePaths.map((filePath) => ({
    category: filePath.split("/")[1],
    doc: filePath.split("/")[2],
  }));
}

export default async function Page({ params }: { params: Promise<{ category: string; doc: string }> }) {
  return (
    <Suspense fallback={<Loading />}>
      <DocPage params={params} />
    </Suspense>
  );
}
