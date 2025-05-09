import { CANVAS_DEFAULTS } from "./canvas-defaults";
import { getGridProps } from "../props/grid-props/grid-props";
import { T_PATTERN_OPTION } from "../props/pattern-option.types";

const { CANVAS_WIDTH, BODY_HEIGHT, HEADER_HEIGHT, BOX_HEIGHT, CIRCLE_ICON_SIZE } = CANVAS_DEFAULTS;

// Constants
const NUM_PARTITIONS = getGridProps("SERVER").GRID_HORIZONTAL;
const PARTITION_HEIGHT = BODY_HEIGHT / NUM_PARTITIONS;
const CIRCLE_SIZE = 4 * CIRCLE_ICON_SIZE.CIRCLE;

// Y-Axis Helpers
const xPartitionTop = (boxIndex: number): number => HEADER_HEIGHT + PARTITION_HEIGHT * (boxIndex - 1);
const xPartitionMidPoint = (boxIndex: number): number => xPartitionTop(boxIndex) + PARTITION_HEIGHT / 2;
const xBoxTop = (boxIndex: number): number => xPartitionMidPoint(boxIndex) - BOX_HEIGHT / 2;
const xBoxBottom = (boxIndex: number): number => xPartitionMidPoint(boxIndex) + BOX_HEIGHT / 2;
const xBoxMidPoint = (boxIndex: number): number => xPartitionMidPoint(boxIndex);
const xCirclePartitionTop = (boxIndex: number): number => xPartitionTop(boxIndex) - CIRCLE_SIZE / 2;
const xCirclePartitionMidPoint = (boxIndex: number): number => xPartitionMidPoint(boxIndex) - CIRCLE_SIZE / 2;

// X-Axis Helpers
const yPartitionWidth = (patternOption: T_PATTERN_OPTION): number => CANVAS_WIDTH / getGridProps(patternOption).GRID_VERTICAL;
const yPartitionStart = (patternOption: T_PATTERN_OPTION, index: number): number => (index - 1) * yPartitionWidth(patternOption);
const yPartitionFraction = (patternOption: T_PATTERN_OPTION, index: number, fraction: number): number => yPartitionStart(patternOption, index) + yPartitionWidth(patternOption) * fraction;
const yCirclePartitionFraction = (patternOption: T_PATTERN_OPTION, index: number, fraction: number): number => yPartitionFraction(patternOption, index, fraction) - CIRCLE_SIZE / 2;

export const CANVAS_CALCULATION = {
  xPartitionTop,
  xPartitionMidPoint,
  xBoxTop,
  xBoxBottom,
  xBoxMidPoint,
  xCirclePartitionTop,
  xCirclePartitionMidPoint,
  yPartitionWidth,
  yPartitionStart,
  yPartitionFraction,
  yCirclePartitionFraction,
};
