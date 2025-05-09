import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { CANVAS_DEFAULTS } from "../../utils/canvas-defaults";
import { T_CIRCLE_PROPS } from "../../props/request-props/request-circle-props";

const BASE_ICON_SIZE_STYLE = (size: number) => ({ width: `calc(var(--spacing) * ${size})`, height: `calc(var(--spacing) * ${size})`, color: "var(--color-foreground)" });

export const RequestCircles = ({ circles }: { circles: T_CIRCLE_PROPS[] }) => {
  const { CIRCLE_ICON_SIZE } = CANVAS_DEFAULTS;
  const browserIconSize = CIRCLE_ICON_SIZE.BROWSER;
  const circleIconSize = CIRCLE_ICON_SIZE.CIRCLE;
  const boundingBoxSize = CIRCLE_ICON_SIZE.BOUNDING_BOX;

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
              <Icon style={BASE_ICON_SIZE_STYLE(browserIconSize)} />
            </div>
          </foreignObject>
        );
      })}
    </g>
  );
};
