import { VscBrowser } from "react-icons/vsc";
import { T_QUERY_OPTION } from "../utils/types";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { SiVercel } from "react-icons/si";
import { COLORS } from "../utils/colors";

const SUBTITLES = ["Singapore", "San Francisco"];
const TITLES = ["API", "Empty", "Server", "Browser"];
const ICONS = [HiOutlineCodeBracketSquare, VscBrowser, SiVercel, VscBrowser];

export type T_BOX_PROPS = {
  horizontalIndex: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconSize?: number | undefined;
  iconYOffset?: number | undefined;
  iconXOffset?: number | undefined;
  visible: boolean;
  fill: string;
  stroke: string;
  strokeDashed: boolean;
};

const BASE_PROPS = [
  {
    horizontalIndex: 0,
    title: TITLES[0],
    subtitle: SUBTITLES[0],
    icon: ICONS[0],
    iconSize: 18,
    iconYOffset: -1.5,
  },
  {
    horizontalIndex: 1,
    title: TITLES[1],
    subtitle: "",
    icon: ICONS[1],
  },
  {
    horizontalIndex: 2,
    title: TITLES[2],
    subtitle: SUBTITLES[1],
    icon: ICONS[2],
    iconSize: 13,
    iconYOffset: 0.75,
    iconXOffset: 3,
  },
  {
    horizontalIndex: 3,
    title: TITLES[3],
    subtitle: SUBTITLES[1],
    icon: ICONS[3],
    iconSize: 15,
  },
];

const EMPTY = {
  ...BASE_PROPS[1],
  visible: false,
  fill: COLORS.transparent,
  stroke: COLORS.transparent,
  strokeDashed: false,
};

const DEFAULT_BROWSER = {
  ...BASE_PROPS[3],
  visible: true,
  fill: COLORS.transparent,
  stroke: COLORS.border,
  strokeDashed: true,
};

const DEFAULT_SERVER = {
  ...BASE_PROPS[2],
  visible: true,
  fill: COLORS.purple,
  stroke: COLORS.purpleStroke,
  strokeDashed: false,
};

const BOXES_PROPS: Record<T_QUERY_OPTION, T_BOX_PROPS[]> = {
  client_fresh: [
    {
      ...BASE_PROPS[0],
      visible: true,
      fill: COLORS.green,
      stroke: COLORS.greenStroke,
      strokeDashed: false,
    },
    {
      ...EMPTY,
    },
    {
      ...EMPTY,
    },
    {
      ...DEFAULT_BROWSER,
    },
  ],
  client_cached: [
    {
      ...BASE_PROPS[0],
      visible: true,
      fill: COLORS.transparent,
      stroke: COLORS.border,
      strokeDashed: true,
    },
    {
      ...EMPTY,
    },
    {
      ...DEFAULT_SERVER,
    },
    {
      ...DEFAULT_BROWSER,
    },
  ],
  client_swr: [
    {
      ...BASE_PROPS[0],
      visible: true,
      fill: COLORS.cyan,
      stroke: COLORS.cyanStroke,
      strokeDashed: false,
    },
    {
      ...EMPTY,
    },
    {
      ...DEFAULT_SERVER,
      strokeDashed: true,
    },
    {
      ...DEFAULT_BROWSER,
    },
  ],
  server_fresh: [
    {
      ...BASE_PROPS[0],
      visible: true,
      fill: COLORS.green,
      stroke: COLORS.greenStroke,
      strokeDashed: false,
    },
    {
      ...EMPTY,
    },
    {
      ...DEFAULT_SERVER,
      strokeDashed: true,
    },
    {
      ...DEFAULT_BROWSER,
      stroke: COLORS.border,
    },
  ],
  server_cached: [
    {
      ...BASE_PROPS[0],
      visible: true,
      fill: COLORS.transparent,
      stroke: COLORS.border,
      strokeDashed: true,
    },
    {
      ...EMPTY,
    },
    {
      ...DEFAULT_SERVER,
    },
    {
      ...DEFAULT_BROWSER,
    },
  ],
  both: [
    {
      ...BASE_PROPS[0],
      visible: true,
      fill: COLORS.cyan,
      stroke: COLORS.cyanStroke,
      strokeDashed: false,
    },
    {
      ...EMPTY,
    },
    {
      ...DEFAULT_SERVER,
    },
    {
      ...DEFAULT_BROWSER,
      strokeDashed: true,
    },
  ],
};

export const getBoxesProps = (queryOption: T_QUERY_OPTION): T_BOX_PROPS[] => {
  return BOXES_PROPS[queryOption as keyof typeof BOXES_PROPS];
};
