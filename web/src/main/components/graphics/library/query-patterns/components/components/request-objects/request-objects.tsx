import { ChevronDown, ChevronUp } from "lucide-react";
import { getRequestObjectProps, T_REQUEST_OBJECT_PROPS } from "../../props/request-objects-props";
import { CANVAS_DEFAULTS } from "../../utils/defaults";
import { T_QUERY_OPTION } from "../../utils/types";

export const RequestObjects = ({ queryOption }: { queryOption: T_QUERY_OPTION }) => {
  const props = getRequestObjectProps(queryOption);
  const { narrowCanvasWidth } = CANVAS_DEFAULTS;
  const canvasWidth = narrowCanvasWidth;

  return (
    <g>
      {props.map((prop, index) => (
        <g key={index}>
          <line
            x1={canvasWidth / 2 + prop.xOffset}
            x2={canvasWidth / 2 + prop.xOffset}
            y1={prop.lineY1}
            y2={prop.lineY2}
            stroke={prop.color}
            strokeWidth={2}
          />
          {prop.iconVisible && (
            <RequestCircle
              prop={prop}
              canvasWidth={canvasWidth}
            />
          )}
        </g>
      ))}
    </g>
  );
};

const RequestCircle = ({ prop, canvasWidth }: { prop: T_REQUEST_OBJECT_PROPS; canvasWidth: number }) => {
  const { headerHeight, bodyHeight, circleRadius } = CANVAS_DEFAULTS;
  const IconComponent = prop.iconType === "down" ? ChevronDown : ChevronUp;

  const baseX = canvasWidth / 2 - circleRadius;
  const baseY = headerHeight + bodyHeight / 2 - circleRadius;

  return (
    <g transform={`translate(${baseX + prop.xOffset}, ${baseY + prop.iconYOffset})`}>
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius}
        fill={prop.color}
      />
      <IconComponent
        x={0}
        y={0}
        size={circleRadius * 2}
        stroke={prop.iconColor}
      />
    </g>
  );
};
