import { CANVAS_CALCULATION } from "../../utils/canvas-calculation";
import { T_PATTERN_OPTION } from "../pattern-option.types";

const PATTERN_OPTION_CLIENT = "CLIENT";
const PATTERN_OPTION_SERVER = "SERVER";
const PATTERN_OPTION_BOTH = "BOTH";

export type T_CIRCLE_PROPS = {
  x: number;
  indexX?: number;
  y: number;
  color: string;
  type: "down" | "up";
  index: number;
};

const CLIENT_CIRCLE_PROPS: T_CIRCLE_PROPS[] = [
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 1, 0.5),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.5),
    y: CANVAS_CALCULATION.xCirclePartitionTop(3),
    color: "var(--color-green-600)",
    type: "down",
    index: 1,
  },
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.5),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.5),
    y: CANVAS_CALCULATION.xCirclePartitionTop(4),
    color: "var(--color-purple-600)",
    type: "down",
    index: 2,
  },
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 3, 0.25),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.25),
    y: CANVAS_CALCULATION.xCirclePartitionTop(4),
    color: "var(--color-purple-600)",
    type: "down",
    index: 3,
  },
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 3, 0.75),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.75),
    y: CANVAS_CALCULATION.xCirclePartitionMidPoint(2),
    color: "var(--color-cyan-600)",
    type: "down",
    index: 3,
  },
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 3, 0.25),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.25),
    y: CANVAS_CALCULATION.xCirclePartitionMidPoint(2),
    color: "var(--color-cyan-600)",
    type: "up",
    index: 3,
  },
];

const SERVER_CIRCLE_PROPS: T_CIRCLE_PROPS[] = [
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_SERVER, 1, 0.33),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.33),
    y: CANVAS_CALCULATION.xCirclePartitionMidPoint(2),
    color: "var(--color-green-600)",
    type: "up",
    index: 1,
  },
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_SERVER, 1, 0.66),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.66),
    y: CANVAS_CALCULATION.xCirclePartitionMidPoint(2),
    color: "var(--color-green-600)",
    type: "down",
    index: 1,
  },
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_SERVER, 2, 0.5),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.5),
    y: CANVAS_CALCULATION.xCirclePartitionTop(4),
    color: "var(--color-purple-600)",
    type: "down",
    index: 2,
  },
];

const BOTH_CIRCLE_PROPS: T_CIRCLE_PROPS[] = [
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_BOTH, 1, 0.42),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.42),
    y: CANVAS_CALCULATION.xCirclePartitionTop(4),
    color: "var(--color-purple-600)",
    type: "down",
    index: 1,
  },
  {
    x: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_BOTH, 1, 0.58),
    indexX: CANVAS_CALCULATION.yCirclePartitionFraction(PATTERN_OPTION_CLIENT, 2, 0.58),
    y: CANVAS_CALCULATION.xCirclePartitionTop(3),
    color: "var(--color-cyan-600)",
    type: "down",
    index: 1,
  },
];

type T_CIRCLE_PROPS_BY_PATTERN = {
  [key in T_PATTERN_OPTION]: T_CIRCLE_PROPS[];
};

const CIRCLE_PROPS_BY_PATTERN: T_CIRCLE_PROPS_BY_PATTERN = {
  [PATTERN_OPTION_CLIENT]: CLIENT_CIRCLE_PROPS,
  [PATTERN_OPTION_SERVER]: SERVER_CIRCLE_PROPS,
  [PATTERN_OPTION_BOTH]: BOTH_CIRCLE_PROPS,
};

export const getCircleProps = (patternOption: T_PATTERN_OPTION) => CIRCLE_PROPS_BY_PATTERN[patternOption];
