import { CANVAS_DEFAULTS } from "../../utils/canvas-defaults";
import { SvgVerticalLine } from "@/main/components/svg-helpers/svg-helpers";
import { T_LINE_PROPS } from "../../props/request-props/request-line-props";

export const RequestLines = ({ lines }: { lines: T_LINE_PROPS[] }) => {
  const { SCALE, CANVAS_SIZE } = CANVAS_DEFAULTS;
  const strokeWidth = 2 * SCALE;

  return (
    <g>
      {lines.map(({ point, y1, y2, color }, index) => (
        <SvgVerticalLine key={index} point={point} y1={y1} y2={y2} size={CANVAS_SIZE} color={color} strokeWidth={strokeWidth} />
      ))}
    </g>
  );
};
