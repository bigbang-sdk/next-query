import { CANVAS_DEFAULTS } from "../../utils/defaults";
import { T_CANVAS_SIZE } from "../../utils/types";
import { COLORS } from "../../utils/colors";
import { SVG } from "@/main/components/lib/svg-helpers/svg-helpers";

export const GridLines = ({ size }: { size: T_CANVAS_SIZE }) => {
  const { fullCanvasWidth, narrowCanvasWidth, headerHeight, bodyHeight } = CANVAS_DEFAULTS.canvasProps;
  const { gridLinesHorizontal, gridLinesStrokeWidth } = CANVAS_DEFAULTS.gridProps;
  const canvasWidth = size === "full" ? fullCanvasWidth : narrowCanvasWidth;

  return (
    <g id="grid-lines-horizontal">
      {Array.from({ length: gridLinesHorizontal }).map((_, index) => (
        <SVG.HorizontalLine
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
