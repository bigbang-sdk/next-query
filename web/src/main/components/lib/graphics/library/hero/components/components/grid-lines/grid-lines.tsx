import { SVG } from "@/main/components/lib/svg-helpers/svg-helpers";
import { CANVAS_DEFAULTS } from "../../utils/defaults";
import { COLORS } from "../../utils/colors";

export const GridLines = ({ border = false }: { border?: boolean }) => {
  const { canvasWidth, canvasHeight } = CANVAS_DEFAULTS.canvasProps;
  const { gridHorizontal, gridVertical } = CANVAS_DEFAULTS.gridProps;
  return (
    <g id="grid-lines">
      {Array.from({ length: border ? gridVertical + 1 : gridVertical - 1 }).map((_, index) => (
        <SVG.HorizontalLine
          key={index}
          point={(border ? index : index + 1) * (canvasHeight / gridVertical)}
          size={canvasWidth}
          color={COLORS.border}
        />
      ))}
      {Array.from({ length: border ? gridHorizontal + 1 : gridHorizontal - 1 }).map((_, index) => (
        <SVG.VerticalLine
          key={index}
          point={(border ? index : index + 1) * (canvasWidth / gridHorizontal)}
          size={canvasHeight}
          color={COLORS.border}
        />
      ))}
    </g>
  );
};
