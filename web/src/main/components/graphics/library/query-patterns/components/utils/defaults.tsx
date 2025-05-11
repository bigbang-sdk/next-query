const GRID_PROPS = {
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
const partitionHeight = bodyHeight / GRID_PROPS.gridLinesHorizontal;
const partitionHeightRatio = partitionHeight / defaultCanvasSize;
const narrowPartitionHeightRatio = (partitionHeightRatio / narrowCanvasWidth) * fullCanvasWidth;

const CANVAS_PROPS = {
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

const BOX_PROPS = {
  boxWidth: 160,
  boxHeight: 45,
  boxRadius: 8,
  boxFillOpacity: 0.4,
  boxStrokeWidth: 1.5,
};

const FONT_PROPS = {
  fontSizeText: 12,
  fontSizeSubtext: 10,
  fontWeightHeader: 600,
  fontCharacterWidthEstimate: 0.48,
};

export const CANVAS_DEFAULTS = {
  ...CANVAS_PROPS,
  ...BOX_PROPS,
  ...GRID_PROPS,
  ...FONT_PROPS,
  circleRadius: 9,
};
