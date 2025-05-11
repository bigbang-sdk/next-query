import { T_QUERY_OPTION } from "../utils/types";
import { TbLeaf, TbDatabase } from "react-icons/tb";
import { RiExchange2Line } from "react-icons/ri";
import { IconType } from "react-icons/lib";

const ICON_LIB = {
  fresh: TbLeaf,
  cached: TbDatabase,
  swr: RiExchange2Line,
};

export type T_HEADER_PROPS = {
  title: string;
  subtitle: string;
  icon: IconType;
};

const HEADER_PROPS: Record<T_QUERY_OPTION, T_HEADER_PROPS> = {
  client_fresh: {
    title: "Fresh Data",
    subtitle: "Fetched directly on the client",
    icon: ICON_LIB.fresh,
  },
  client_cached: {
    title: "Cached Data",
    subtitle: "Fetched from the server",
    icon: ICON_LIB.cached,
  },
  client_swr: {
    title: "SWR",
    subtitle: "Fetched from the server, while revalidating",
    icon: ICON_LIB.swr,
  },
  server_fresh: {
    title: "Fresh Data",
    subtitle: "Fetched directly from the API",
    icon: ICON_LIB.fresh,
  },
  server_cached: {
    title: "Cached Data",
    subtitle: "Fetched from the server",
    icon: ICON_LIB.cached,
  },
  both: {
    title: "Both",
    subtitle: "Fetched from the server, while revalidating",
    icon: ICON_LIB.swr,
  },
};

export const getHeaderProps = (queryOption: T_QUERY_OPTION) => {
  return HEADER_PROPS[queryOption];
};
