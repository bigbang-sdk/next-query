import { getGridProps } from "../../props/grid-props/grid-props";
import { T_PATTERN_OPTION } from "../../props/pattern-option.types";
import { CANVAS_DEFAULTS } from "../../utils/canvas-defaults";
import { SvgHorizontalLine, SvgVerticalLine } from "@/main/components/svg-helpers/svg-helpers";

export const GridLines = ({ patternOption, index }: { patternOption: T_PATTERN_OPTION; index: number | null }) => {
  const { GRID_VERTICAL: DEFAULT_GRID_VERTICAL, GRID_HORIZONTAL } = getGridProps(patternOption);
  const GRID_VERTICAL = index ? 1 : DEFAULT_GRID_VERTICAL;
  const { CANVAS_WIDTH, CANVAS_HEIGHT, HEADER_HEIGHT, BODY_HEIGHT, SCALE } = CANVAS_DEFAULTS;
  const strokeWidth = 1 * SCALE;

  const verticalPoints = GRID_VERTICAL > 1 ? Array.from({ length: GRID_VERTICAL - 1 }, (_, i) => ((i + 1) * CANVAS_WIDTH) / GRID_VERTICAL) : [];

  const horizontalPoints = () => {
    const points: number[] = [HEADER_HEIGHT];
    if (GRID_HORIZONTAL > 1) {
      const bodyLines = Array.from({ length: GRID_HORIZONTAL - 1 }, (_, i) => HEADER_HEIGHT + ((i + 1) * BODY_HEIGHT) / GRID_HORIZONTAL);
      points.push(...bodyLines);
    }
    return points;
  };

  return (
    <g id="grid-lines">
      {verticalPoints.map((point, idx) => (
        <SvgVerticalLine key={`v${idx}`} point={point} size={CANVAS_HEIGHT} strokeWidth={strokeWidth} />
      ))}
      {horizontalPoints().map((point, idx) => (
        <SvgHorizontalLine key={`h${idx}`} point={point} size={CANVAS_WIDTH} strokeWidth={strokeWidth} />
      ))}
      <BorderLines />
    </g>
  );
};

const BorderLines = () => {
  const { CANVAS_WIDTH, CANVAS_HEIGHT, SCALE } = CANVAS_DEFAULTS;
  const strokeWidth = 1 * SCALE;

  return (
    <g id="border-lines">
      <SvgVerticalLine point={0} size={CANVAS_HEIGHT} strokeWidth={strokeWidth} />
      <SvgVerticalLine point={CANVAS_WIDTH} size={CANVAS_HEIGHT} strokeWidth={strokeWidth} />
      <SvgHorizontalLine point={0} size={CANVAS_WIDTH} strokeWidth={strokeWidth} />
      <SvgHorizontalLine point={CANVAS_HEIGHT} size={CANVAS_WIDTH} strokeWidth={strokeWidth} />
    </g>
  );
};
