import { CustomBox } from "../custom-box/custom-box";
import { CANVAS_DEFAULTS } from "../../utils/canvas-defaults";
import { T_PATTERN_OPTION } from "../../props/pattern-option.types";
import { getGridProps } from "../../props/grid-props/grid-props";
import { BOX_OPTIONS, T_BOX_OPTION } from "../../props/box_option";

type T_BOX_POSITION = {
  x: number;
  y: number;
  key: string;
  type: T_BOX_OPTION;
  x_coordinate: number;
  y_coordinate: number;
};

export const BoxesStack = ({ patternOption }: { patternOption: T_PATTERN_OPTION }) => {
  const { CANVAS_WIDTH, HEADER_HEIGHT, BODY_HEIGHT, BOX_WIDTH, BOX_HEIGHT } = CANVAS_DEFAULTS;
  const { GRID_VERTICAL, GRID_HORIZONTAL } = getGridProps(patternOption);
  const segmentWidth = CANVAS_WIDTH / GRID_VERTICAL;
  const halfSegmentHeight = BODY_HEIGHT / GRID_HORIZONTAL / 2;
  const headerY = HEADER_HEIGHT / 2;

  // Compute header box positions
  const headerBoxes: T_BOX_POSITION[] = Array.from({ length: GRID_VERTICAL }, (_, i) => ({
    x: (i + 0.5) * segmentWidth,
    y: headerY,
    key: `header-${i}`,
    type: "Header",
    x_coordinate: i,
    y_coordinate: 0,
  }));

  // Compute body box positions
  const bodyBoxes: T_BOX_POSITION[] = Array.from({ length: GRID_HORIZONTAL }, (_, row) =>
    Array.from({ length: GRID_VERTICAL }, (_, col) => ({
      x: (col + 0.5) * segmentWidth,
      y: HEADER_HEIGHT + row * 2 * halfSegmentHeight + halfSegmentHeight,
      key: `body-${row}-${col}`,
      type: BOX_OPTIONS[row],
      x_coordinate: col,
      y_coordinate: row,
    }))
  ).flat();

  return (
    <g id="boxes-stack">
      {headerBoxes.map(({ x, y, key, type, x_coordinate, y_coordinate }) => (
        <CustomBox key={key} x={x} y={y} width={BOX_WIDTH} height={BOX_HEIGHT} type={type} patternOption={patternOption} x_coordinate={x_coordinate} y_coordinate={y_coordinate} />
      ))}
      {bodyBoxes.map(({ x, y, key, type, x_coordinate, y_coordinate }) => (
        <CustomBox key={key} x={x} y={y} width={BOX_WIDTH} height={BOX_HEIGHT} type={type} patternOption={patternOption} x_coordinate={x_coordinate} y_coordinate={y_coordinate} />
      ))}
    </g>
  );
};
