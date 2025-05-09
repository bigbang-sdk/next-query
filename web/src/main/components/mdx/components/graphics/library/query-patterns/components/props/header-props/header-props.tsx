import { TbDatabase } from "react-icons/tb";
import { TbLeaf } from "react-icons/tb";
import { RiExchange2Line } from "react-icons/ri";
import { T_PATTERN_OPTION } from "../pattern-option.types";

const BASE_ICON_STYLE = (size: number) => ({ width: `calc(var(--spacing) * ${size})`, height: `calc(var(--spacing) * ${size})` });
const BASE_ICON_CLASS = "text-foreground";

type T_HEADER_PROPS = {
  label: string;
  subtext: string;
  x_translate: number;
  icon: (serverIconSize: number) => React.ReactNode;
};

const CLIENT_HEADER_PROPS: T_HEADER_PROPS[] = [
  {
    label: "Fresh Data",
    subtext: "Fetched directly on the client",
    x_translate: 0.5,
    icon: (size) => <TbLeaf style={BASE_ICON_STYLE(size)} className={BASE_ICON_CLASS} />,
  },
  {
    label: "Cached Data",
    subtext: "Fetched from the server",
    x_translate: 0.75,
    icon: (size) => <TbDatabase style={BASE_ICON_STYLE(size)} className={BASE_ICON_CLASS} />,
  },
  {
    label: "SWR",
    subtext: "Fetched from the server, while revalidating",
    x_translate: 0,
    icon: (size) => <RiExchange2Line style={BASE_ICON_STYLE(size)} className={BASE_ICON_CLASS} />,
  },
];

const SERVER_HEADER_PROPS: T_HEADER_PROPS[] = [
  {
    label: "Fresh Data",
    subtext: "Fetched directly from the API",
    x_translate: 0.5,
    icon: (size) => <TbLeaf style={BASE_ICON_STYLE(size)} className={BASE_ICON_CLASS} />,
  },
  {
    label: "Cached Data",
    subtext: "Fetched from the server",
    x_translate: 0.75,
    icon: (size) => <TbDatabase style={BASE_ICON_STYLE(size)} className={BASE_ICON_CLASS} />,
  },
];

const BOTH_HEADER_PROPS: T_HEADER_PROPS[] = [
  {
    label: "SWR",
    subtext: "Sent from the server, while revalidated on the client",
    x_translate: 0.5,
    icon: (size) => <RiExchange2Line style={BASE_ICON_STYLE(size)} className={BASE_ICON_CLASS} />,
  },
];

type T_HEADER_PROPS_BY_PATTERN = {
  [key in T_PATTERN_OPTION]: T_HEADER_PROPS[];
};

const HEADER_PROPS_BY_PATTERN: T_HEADER_PROPS_BY_PATTERN = {
  CLIENT: CLIENT_HEADER_PROPS,
  SERVER: SERVER_HEADER_PROPS,
  BOTH: BOTH_HEADER_PROPS,
};

export const getHeaderProps = (patternOption: T_PATTERN_OPTION) => HEADER_PROPS_BY_PATTERN[patternOption];
