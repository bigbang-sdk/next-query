import { T_QUERY_OPTION } from "../../utils/types";
import { CANVAS_DEFAULTS } from "../../utils/defaults";
import { getBoxesProps, T_BOX_PROPS } from "../../props/boxes-props";
import { CanvasXCentered, T_X_CENTERED_PROPS } from "../../ui/canvas-x-centered";

export const Boxes = ({ queryOption }: { queryOption: T_QUERY_OPTION }) => {
  const { narrowCanvasWidth, bodyHeight, headerHeight, gridLinesHorizontal } = CANVAS_DEFAULTS;
  const canvasWidth = narrowCanvasWidth;
  const sectionHeight = bodyHeight / gridLinesHorizontal;

  const gapY = sectionHeight / 10;
  return (
    <g>
      {Array.from({ length: 4 }).map((_, index) => {
        const props = getBoxesProps(queryOption)[index];

        if (!props.visible) return null;
        return (
          <g key={index}>
            <BoxOutline props={props} />
            <CanvasXCentered.TitleWithIcon
              canvasWidth={canvasWidth}
              props={props as T_X_CENTERED_PROPS}
              gapY={(80 / 100) * gapY}
              y={headerHeight + sectionHeight * props.horizontalIndex + sectionHeight / 2}
            />
            <CanvasXCentered.Subtitle
              canvasWidth={canvasWidth}
              props={props as T_X_CENTERED_PROPS}
              gapY={(120 / 100) * gapY}
              y={headerHeight + sectionHeight * props.horizontalIndex + sectionHeight / 2}
            />
          </g>
        );
      })}
    </g>
  );
};

const BoxOutline = ({ props }: { props: T_BOX_PROPS }) => {
  const { narrowCanvasWidth, headerHeight, boxHeight, boxWidth, boxRadius, boxStrokeWidth, bodyHeight, gridLinesHorizontal, boxFillOpacity } = CANVAS_DEFAULTS;
  const canvasWidth = narrowCanvasWidth;
  const sectionHeight = bodyHeight / gridLinesHorizontal;
  const sectionWhitespace = sectionHeight - boxHeight;

  if (!props.visible) return null;

  return (
    <rect
      x={canvasWidth / 2 - boxWidth / 2}
      y={headerHeight + sectionHeight * props.horizontalIndex + sectionWhitespace / 2}
      width={boxWidth}
      height={boxHeight}
      fill={props.fill}
      fillOpacity={boxFillOpacity}
      stroke={props.stroke}
      strokeWidth={boxStrokeWidth}
      strokeDasharray={props.strokeDashed ? "10 5" : undefined}
      rx={boxRadius}
      ry={boxRadius}
    />
  );
};
