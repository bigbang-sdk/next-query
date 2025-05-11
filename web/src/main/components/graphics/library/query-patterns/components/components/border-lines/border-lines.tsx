import { SvgHorizontalLine, SvgVerticalLine } from "@/main/components/svg-helpers/svg-helpers";
import { CANVAS_DEFAULTS } from "../../utils/defaults";

type T_BORDER_LINES = {
  width: number;
  height: number;
  dividingPoints?: number[];
};

export const BorderLines = ({ width, height, dividingPoints }: T_BORDER_LINES) => {
  const { gridLinesStrokeWidth } = CANVAS_DEFAULTS;

  return (
    <g id="border-lines">
      {Array.from({ length: 2 }).map((_, index) => (
        <SvgHorizontalLine
          key={index}
          point={index === 0 ? 0 : height}
          size={width}
          strokeWidth={gridLinesStrokeWidth}
        />
      ))}
      {Array.from({ length: 2 }).map((_, index) => (
        <SvgVerticalLine
          key={index}
          point={index === 0 ? 0 : width}
          size={height}
          strokeWidth={gridLinesStrokeWidth}
        />
      ))}
      {dividingPoints?.map((point, index) => (
        <SvgVerticalLine
          key={index}
          point={point}
          size={height}
          strokeWidth={gridLinesStrokeWidth}
        />
      ))}
    </g>
  );
};
