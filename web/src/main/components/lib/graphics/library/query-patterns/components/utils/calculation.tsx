import { CANVAS_DEFAULTS } from "./defaults";
const { bodyHeight, headerHeight } = CANVAS_DEFAULTS.canvasProps;
const { gridLinesHorizontal } = CANVAS_DEFAULTS.gridProps;
const { boxHeight, boxWidth } = CANVAS_DEFAULTS.boxProps;
const partitionHeight = bodyHeight / gridLinesHorizontal;

const yPartitionTop = (boxIndex: number): number => headerHeight + partitionHeight * (boxIndex - 1);
const yPartitionMidPoint = (boxIndex: number): number => yPartitionTop(boxIndex) + partitionHeight / 2;
const yBoxTop = (boxIndex: number): number => yPartitionMidPoint(boxIndex) - boxHeight / 2;
const yBoxBottom = (boxIndex: number): number => yPartitionMidPoint(boxIndex) + boxHeight / 2;
const yBoxMidPoint = (boxIndex: number): number => yPartitionMidPoint(boxIndex);

const boxWidthPercent = (percent: number): number => boxWidth * percent;

export const CANVAS_CALCULATION = {
  yPartitionTop,
  yPartitionMidPoint,
  yBoxTop,
  yBoxBottom,
  yBoxMidPoint,
  boxWidthPercent,
};
