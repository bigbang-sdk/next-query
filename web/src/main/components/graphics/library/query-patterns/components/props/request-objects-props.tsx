import { COLORS } from "../utils/colors";
import { T_QUERY_OPTION } from "../utils/types";
import { CANVAS_CALCULATION } from "../utils/calculation";
import { CANVAS_DEFAULTS } from "../utils/defaults";

const { yBoxTop, yBoxBottom, boxWidthPercent } = CANVAS_CALCULATION;
const { partitionHeight } = CANVAS_DEFAULTS;

export type T_REQUEST_OBJECT_PROPS = {
  color: string;
  lineY1: number;
  lineY2: number;
  xOffset: number;
  iconVisible: boolean;
  iconType: "down" | "up";
  iconYOffset: number;
  iconColor: string;
};

const REQUEST_OBJECT_PROPS: Record<T_QUERY_OPTION, T_REQUEST_OBJECT_PROPS[]> = {
  client_fresh: [
    {
      color: COLORS.greenObject,
      lineY1: yBoxBottom(1),
      lineY2: yBoxTop(4),
      xOffset: 0,
      iconVisible: true,
      iconType: "down",
      iconYOffset: 0,
      iconColor: COLORS.greenIcon,
    },
  ],
  client_cached: [
    {
      color: COLORS.purpleObject,
      lineY1: yBoxBottom(3),
      lineY2: yBoxTop(4),
      xOffset: 0,
      iconVisible: true,
      iconType: "down",
      iconYOffset: partitionHeight,
      iconColor: COLORS.purpleIcon,
    },
  ],
  client_swr: [
    {
      color: COLORS.purpleObject,
      lineY1: yBoxBottom(3),
      lineY2: yBoxTop(4),
      xOffset: -boxWidthPercent(0.4),
      iconVisible: true,
      iconType: "down",
      iconYOffset: partitionHeight,
      iconColor: COLORS.purpleIcon,
    },
    {
      color: COLORS.cyanObject,
      lineY1: yBoxBottom(1),
      lineY2: yBoxTop(3),
      xOffset: -boxWidthPercent(0.4),
      iconVisible: true,
      iconType: "up",
      iconYOffset: -partitionHeight / 2,
      iconColor: COLORS.cyanIcon,
    },
    {
      color: COLORS.cyanObject,
      lineY1: yBoxBottom(1),
      lineY2: yBoxTop(3),
      xOffset: boxWidthPercent(0.4),
      iconVisible: true,
      iconType: "down",
      iconYOffset: -partitionHeight / 2,
      iconColor: COLORS.cyanIcon,
    },
    {
      color: COLORS.purpleObject,
      lineY1: yBoxTop(3),
      lineY2: yBoxTop(4),
      xOffset: boxWidthPercent(0.4),
      iconType: "down",
      iconYOffset: -partitionHeight / 2,
      iconVisible: false,
      iconColor: COLORS.purpleIcon,
    },
  ],
  server_fresh: [
    {
      color: COLORS.greenObject,
      lineY1: yBoxBottom(1),
      lineY2: yBoxTop(3),
      xOffset: -boxWidthPercent(0.4),
      iconVisible: true,
      iconType: "up",
      iconYOffset: -partitionHeight / 2,
      iconColor: COLORS.greenIcon,
    },
    {
      color: COLORS.greenObject,
      lineY1: yBoxBottom(1),
      lineY2: yBoxTop(3),
      xOffset: boxWidthPercent(0.4),
      iconVisible: true,
      iconType: "down",
      iconYOffset: -partitionHeight / 2,
      iconColor: COLORS.greenIcon,
    },
    {
      color: COLORS.purpleObject,
      lineY1: yBoxTop(3),
      lineY2: yBoxTop(4),
      xOffset: boxWidthPercent(0.4),
      iconVisible: false,
      iconType: "down",
      iconYOffset: -partitionHeight / 2,
      iconColor: COLORS.purpleIcon,
    },
  ],
  server_cached: [
    {
      color: COLORS.purpleObject,
      lineY1: yBoxBottom(3),
      lineY2: yBoxTop(4),
      xOffset: 0,
      iconVisible: true,
      iconType: "down",
      iconYOffset: partitionHeight,
      iconColor: COLORS.purpleIcon,
    },
  ],
  both: [
    {
      color: COLORS.purpleObject,
      lineY1: yBoxBottom(3),
      lineY2: yBoxTop(4),
      xOffset: -boxWidthPercent(0.4),
      iconVisible: true,
      iconType: "down",
      iconYOffset: partitionHeight,
      iconColor: COLORS.purpleIcon,
    },
    {
      color: COLORS.cyanObject,
      lineY1: yBoxBottom(1),
      lineY2: yBoxTop(4),
      xOffset: boxWidthPercent(0.4),
      iconVisible: true,
      iconType: "down",
      iconYOffset: 0,
      iconColor: COLORS.cyanIcon,
    },
  ],
};

export const getRequestObjectProps = (queryOption: T_QUERY_OPTION) => {
  return REQUEST_OBJECT_PROPS[queryOption];
};
