import { T_PATTERN_OPTION } from "../pattern-option.types";

const GRID_PROPS = {
  CLIENT: {
    GRID_VERTICAL: 3,
    GRID_HORIZONTAL: 4,
  },
  SERVER: {
    GRID_VERTICAL: 2,
    GRID_HORIZONTAL: 4,
  },
  BOTH: {
    GRID_VERTICAL: 1,
    GRID_HORIZONTAL: 4,
  },
};

export const getGridProps = (patternOption: T_PATTERN_OPTION) => GRID_PROPS[patternOption];
