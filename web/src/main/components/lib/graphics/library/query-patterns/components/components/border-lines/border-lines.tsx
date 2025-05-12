import { SVG } from "@/main/components/lib/svg-helpers/svg-helpers";
import { CANVAS_DEFAULTS } from "../../utils/defaults";

type T_BORDER_LINES = {
  width: number;
  height: number;
  dividingPoints?: number[];
};

export const BorderLines = ({ width, height, dividingPoints }: T_BORDER_LINES) => {
  const { gridLinesStrokeWidth } = CANVAS_DEFAULTS.gridProps;

  return (
    <g id="border-lines">
      {Array.from({ length: 2 }).map((_, index) => (
        <SVG.HorizontalLine
          key={index}
          point={index === 0 ? 0 : height}
          size={width}
          strokeWidth={gridLinesStrokeWidth}
        />
      ))}
      {Array.from({ length: 2 }).map((_, index) => (
        <SVG.VerticalLine
          key={index}
          point={index === 0 ? 0 : width}
          size={height}
          strokeWidth={gridLinesStrokeWidth}
        />
      ))}
      {dividingPoints?.map((point, index) => (
        <SVG.VerticalLine
          key={index}
          point={point}
          size={height}
          strokeWidth={gridLinesStrokeWidth}
        />
      ))}
    </g>
  );
};
