import { T_QUERY_OPTION } from "../components/utils/types";
import { CANVAS_DEFAULTS } from "../components/utils/defaults";
import { cn } from "@/shadcn/lib/utils";
import { QueryPatternSvg } from "../svg/query-pattern-svg";
import { SVG } from "@/main/components/svg-helpers/svg-helpers";

export const QueryPatternRender = ({ queryOptions }: { queryOptions: T_QUERY_OPTION[] }) => {
  const { narrowCanvasWidth, canvasHeight } = CANVAS_DEFAULTS.canvasProps;

  return (
    <div className={cn("relative isolate w-full h-full flex flex-col gap-y-5 md:flex-row md:items-center px-10 md:px-0", queryOptions.length % 2 === 0 ? "md:justify-evenly" : "md:justify-center")}>
      {queryOptions.map((queryOption, index) => (
        <div
          key={index}
          className="relative w-full md:w-[calc(100%/3)] z-10"
        >
          <div className="relative z-10">
            <SVG.Root
              key={index}
              canvasWidth={narrowCanvasWidth}
              canvasHeight={canvasHeight}
              width={"100%"}
            >
              <QueryPatternSvg queryOption={queryOption} />
            </SVG.Root>
          </div>
          <div className="absolute inset-0 w-full h-full md:hidden z-0">
            <RenderGridLines type="narrow" />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 w-full h-full hidden md:block z-0">
        <RenderGridLines type="full" />
      </div>
    </div>
  );
};

const RenderGridLines = ({ type }: { type: "full" | "narrow" }) => {
  const { gridLinesHorizontal } = CANVAS_DEFAULTS.gridProps;
  const { headerHeightRatio, narrowHeaderHeightRatio, partitionHeightRatio, narrowPartitionHeightRatio } = CANVAS_DEFAULTS.canvasProps;
  return (
    <div className={cn("w-full h-full border")}>
      <div
        className="w-full border-b"
        style={{ aspectRatio: 1 / (type === "full" ? headerHeightRatio : narrowHeaderHeightRatio) }}
      />
      {Array.from({ length: gridLinesHorizontal - 1 }).map((_, index) => (
        <div
          key={index}
          className="w-full border-b"
          style={{ aspectRatio: `1 / ${type === "full" ? partitionHeightRatio : narrowPartitionHeightRatio}` }}
        />
      ))}
    </div>
  );
};
