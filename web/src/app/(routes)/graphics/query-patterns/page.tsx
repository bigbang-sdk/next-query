import { Suspense } from "react";
import { BorderLines } from "@/main/components/lib/graphics/library/query-patterns/components/components/border-lines/border-lines";
import { GridLines } from "@/main/components/lib/graphics/library/query-patterns/components/components/grid-lines/grid-lines";
import { CANVAS_DEFAULTS } from "@/main/components/lib/graphics/library/query-patterns/components/utils/defaults";
import { T_QUERY_OPTION } from "@/main/components/lib/graphics/library/query-patterns/components/utils/types";
import { QueryPatternSvg } from "@/main/components/lib/graphics/library/query-patterns/svg/query-pattern-svg";
import { Loading } from "@/main/components/global/loading/loading";
import { SVG } from "@/main/components/lib/svg-helpers/svg-helpers";
import { SaveAsImage } from "@/main/wrappers/save-as-image";
import { notFound } from "next/navigation";

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
  const queryOptions = q.split(",");
  queryOptions.forEach((option) => {
    if (!queryOptions.includes(option)) notFound();
  });
  const { fullCanvasWidth, narrowCanvasWidth, canvasHeight } = CANVAS_DEFAULTS.canvasProps;
  const canvasWidth = fullCanvasWidth;

  const patternType = checkPatterns(queryOptions);

  return (
    <SaveAsImage
      id={`fetch-pattern-${patternType}`}
      appendTheme
      className="w-full bg-black"
    >
      <SVG.Root
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      >
        <GridLines size={"full"} />
        <BorderLines
          width={canvasWidth}
          height={canvasHeight}
        />
        {queryOptions.map((queryOption, index) => {
          const queryCanvasWidth = canvasWidth / queryOptions.length;
          const emptySpace = queryCanvasWidth - narrowCanvasWidth;
          const translateX = index * queryCanvasWidth + emptySpace / 2;
          return (
            <g
              key={index}
              transform={`translate(${translateX}, 0)`}
            >
              <QueryPatternSvg queryOption={queryOption} />
            </g>
          );
        })}
      </SVG.Root>
    </SaveAsImage>
  );
};

const clientPatterns = ["client_fresh", "client_cached", "client_swr"];
const serverPatterns = ["server_fresh", "server_cached"];
const bothPatterns = ["both"];

const checkPatterns = (queryOptions: T_QUERY_OPTION[]) => {
  if (queryOptions.some((option) => clientPatterns.includes(option))) return "client";
  if (queryOptions.some((option) => serverPatterns.includes(option))) return "server";
  if (queryOptions.some((option) => bothPatterns.includes(option))) return "both";
  return "invalid";
};
