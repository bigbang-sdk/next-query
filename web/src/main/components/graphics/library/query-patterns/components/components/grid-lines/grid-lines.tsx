import { SvgHorizontalLine } from "@/main/components/svg-helpers/svg-helpers";
import { CANVAS_DEFAULTS } from "../../utils/defaults";
import { T_CANVAS_SIZE } from "../../utils/types";
import { COLORS } from "../../utils/colors";

export const GridLines = ({ size }: { size: T_CANVAS_SIZE }) => {
  const { fullCanvasWidth, narrowCanvasWidth, headerHeight, bodyHeight, gridLinesHorizontal, gridLinesStrokeWidth } = CANVAS_DEFAULTS;
  const canvasWidth = size === "full" ? fullCanvasWidth : narrowCanvasWidth;

  return (
    <g id="grid-lines-horizontal">
      {Array.from({ length: gridLinesHorizontal }).map((_, index) => (
        <SvgHorizontalLine
          key={index}
          point={headerHeight + (bodyHeight * index) / gridLinesHorizontal}
          size={canvasWidth}
          strokeWidth={gridLinesStrokeWidth}
          color={COLORS.border}
        />
      ))}
    </g>
  );
};
