const gridProps = {
  gridLinesHorizontal: 4,
  gridLinesStrokeWidth: 1,
};

const defaultCanvasSize = 756;
const fullCanvasWidth = defaultCanvasSize;
const narrowCanvasWidth = defaultCanvasSize / 3;
const canvasHeight = 380;
const headerHeight = 55;
const headerHeightRatio = headerHeight / defaultCanvasSize;
const narrowHeaderHeightRatio = (headerHeightRatio / narrowCanvasWidth) * fullCanvasWidth;
const bodyHeight = canvasHeight - headerHeight;
const partitionHeight = bodyHeight / gridProps.gridLinesHorizontal;
const partitionHeightRatio = partitionHeight / defaultCanvasSize;
const narrowPartitionHeightRatio = (partitionHeightRatio / narrowCanvasWidth) * fullCanvasWidth;

const canvasProps = {
  defaultCanvasSize,
  fullCanvasWidth,
  narrowCanvasWidth,
  canvasHeight,
  headerHeight,
  bodyHeight,
  headerHeightRatio,
  partitionHeight,
  partitionHeightRatio,
  narrowHeaderHeightRatio,
  narrowPartitionHeightRatio,
};

const boxProps = {
  boxWidth: 160,
  boxHeight: 45,
  boxRadius: 8,
  boxFillOpacity: 0.4,
  boxStrokeWidth: 1.5,
};

const fontProps = {
  fontSizeText: 12,
  fontSizeSubtext: 10,
  fontWeightHeader: 600,
  fontCharacterWidthEstimate: 0.48,
};

const requestObjectProps = {
  circleRadius: 9,
};

export const CANVAS_DEFAULTS = {
  canvasProps,
  boxProps,
  gridProps,
  fontProps,
  requestObjectProps,
};
