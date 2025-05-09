import { CANVAS_CALCULATION } from "../../utils/canvas-calculation";
import { T_PATTERN_OPTION } from "../pattern-option.types";

const PATTERN_OPTION_CLIENT = "CLIENT";
const PATTERN_OPTION_SERVER = "SERVER";
const PATTERN_OPTION_BOTH = "BOTH";

export type T_LINE_PROPS = {
  point: number;
  indexPoint: number;
  y1: number;
  y2: number;
  color: string;
  index: number;
};

const CLIENT_LINE_PROPS: T_LINE_PROPS[] = [
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 1, 0.5),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.5),
    y1: CANVAS_CALCULATION.xBoxBottom(1),
    y2: CANVAS_CALCULATION.xBoxTop(4),
    color: "var(--color-green-600)",
    index: 1,
  },
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.5),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.5),
    y1: CANVAS_CALCULATION.xBoxBottom(3),
    y2: CANVAS_CALCULATION.xBoxTop(4),
    color: "var(--color-purple-600)",
    index: 2,
  },
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 3, 0.25),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.25),
    y1: CANVAS_CALCULATION.xBoxBottom(3),
    y2: CANVAS_CALCULATION.xBoxTop(4),
    color: "var(--color-purple-600)",
    index: 3,
  },
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 3, 0.25),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.25),
    y1: CANVAS_CALCULATION.xBoxBottom(1),
    y2: CANVAS_CALCULATION.xBoxTop(3),
    color: "var(--color-cyan-600)",
    index: 3,
  },
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 3, 0.75),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.75),
    y1: CANVAS_CALCULATION.xBoxBottom(1),
    y2: CANVAS_CALCULATION.xBoxTop(4),
    color: "var(--color-cyan-600)",
    index: 3,
  },
];

const SERVER_LINE_PROPS: T_LINE_PROPS[] = [
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_SERVER, 1, 0.33),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.33),
    y1: CANVAS_CALCULATION.xBoxBottom(1),
    y2: CANVAS_CALCULATION.xBoxTop(3),
    color: "var(--color-green-600)",
    index: 1,
  },
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_SERVER, 1, 0.66),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.66),
    y1: CANVAS_CALCULATION.xBoxBottom(1),
    y2: CANVAS_CALCULATION.xBoxTop(4),
    color: "var(--color-green-600)",
    index: 1,
  },
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_SERVER, 2, 0.5),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.5),
    y1: CANVAS_CALCULATION.xBoxBottom(3),
    y2: CANVAS_CALCULATION.xBoxTop(4),
    color: "var(--color-purple-600)",
    index: 2,
  },
];

const BOTH_LINE_PROPS: T_LINE_PROPS[] = [
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_BOTH, 1, 0.42),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.42),
    y1: CANVAS_CALCULATION.xBoxBottom(3),
    y2: CANVAS_CALCULATION.xBoxTop(4),
    color: "var(--color-purple-600)",
    index: 1,
  },
  {
    point: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_BOTH, 1, 0.58),
    indexPoint: CANVAS_CALCULATION.yPartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.58),
    y1: CANVAS_CALCULATION.xBoxBottom(1),
    y2: CANVAS_CALCULATION.xBoxTop(4),
    color: "var(--color-cyan-600)",
    index: 1,
  },
];

type T_LINE_PROPS_BY_PATTERN = {
  [key in T_PATTERN_OPTION]: T_LINE_PROPS[];
};

const LINE_PROPS_BY_PATTERN: T_LINE_PROPS_BY_PATTERN = {
  [PATTERN_OPTION_CLIENT]: CLIENT_LINE_PROPS,
  [PATTERN_OPTION_SERVER]: SERVER_LINE_PROPS,
  [PATTERN_OPTION_BOTH]: BOTH_LINE_PROPS,
};

export const getLineProps = (patternOption: T_PATTERN_OPTION) => LINE_PROPS_BY_PATTERN[patternOption];
