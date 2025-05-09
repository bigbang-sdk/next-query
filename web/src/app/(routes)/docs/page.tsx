import { DocPage } from "./[category]/[doc]/page";
import { Suspense } from "react";
import { Loading } from "@/main/components/loading/loading";

export default async function TabsPage() {
  const params = {
    category: "getting-started",
    doc: "overview",
  };
  const paramsPromise = Promise.resolve(params);
  return (
    <Suspense fallback={<Loading />}>
      <DocPage params={paramsPromise} />
    </Suspense>
  );
}
