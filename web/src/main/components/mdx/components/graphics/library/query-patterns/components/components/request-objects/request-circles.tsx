import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { CANVAS_DEFAULTS } from "../../utils/canvas-defaults";
import { T_CIRCLE_PROPS } from "../../props/request-props/request-circle-props";

const BASE_ICON_SIZE_STYLE = (size: number) => ({ width: `calc(var(--spacing) * ${size})`, height: `calc(var(--spacing) * ${size})` });

export const RequestCircles = ({ circles }: { circles: T_CIRCLE_PROPS[] }) => {
  const { SCALE } = CANVAS_DEFAULTS;
  const browserIconSize = 4 * SCALE;
  const circleIconSize = 5 * SCALE;
  const boundingBoxSize = browserIconSize * 6;

  return (
    <g>
      {circles.map(({ x, y, color, type }) => {
        const key = `${x}-${y}-${type}`;
        const Icon = type === "down" ? ChevronDown : ChevronUp;

        return (
          <foreignObject key={key} x={x} y={y} width={boundingBoxSize} height={boundingBoxSize}>
            <div
              className="rounded-full flex justify-center items-center"
              style={{
                backgroundColor: color,
                ...BASE_ICON_SIZE_STYLE(circleIconSize),
              }}
            >
              <Icon style={BASE_ICON_SIZE_STYLE(browserIconSize)} className="text-foreground" />
            </div>
          </foreignObject>
        );
      })}
    </g>
  );
};
