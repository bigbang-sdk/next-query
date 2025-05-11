import { Loading } from "@/main/components/loading/loading";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageClient } from "./client";

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  return (
    <div className="container-wrapper flex-1 flex flex-col items-center justify-center">
      <Suspense fallback={<Loading />}>
        <PageServer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const PageServer = async ({ searchParams }: { searchParams: Promise<{ q: string }> }) => {
  const q = (await searchParams).q ?? notFound();
  return <PageClient q={q} />;
};
