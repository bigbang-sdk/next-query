export const queryOptions = ["client_fresh", "client_cached", "client_swr", "server_fresh", "server_cached", "both"];

export type T_QUERY_OPTION = (typeof queryOptions)[number];

export type T_CANVAS_SIZE = "full" | "narrow";
