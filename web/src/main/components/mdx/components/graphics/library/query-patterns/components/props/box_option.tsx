export const BOX_OPTIONS = ["API", "Empty", "Server", "Browser", "Header"] as const;

export type T_BOX_OPTION = (typeof BOX_OPTIONS)[number];
