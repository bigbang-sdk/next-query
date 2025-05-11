import { COLORS } from "../utils/colors";

export type T_TAG_PROPS = {
  text: string;
  color: string;
  rotation: number;
  yTranslate: number;
};

export const TAGS_PROPS: T_TAG_PROPS[] = [
  {
    text: "Fast",
    color: COLORS.blue,
    rotation: -12,
    yTranslate: -5,
  },
  {
    text: "Lightweight",
    color: COLORS.red,
    rotation: 9,
    yTranslate: -9,
  },
  {
    text: "Reusable",
    color: COLORS.lime,
    rotation: 3,
    yTranslate: -12,
  },
  {
    text: "SWR",
    color: COLORS.yellow,
    rotation: -3,
    yTranslate: -5,
  },
  {
    text: "Caching",
    color: COLORS.purple,
    rotation: -6,
    yTranslate: 5,
  },
  {
    text: "Revalidation",
    color: COLORS.pink,
    rotation: 8,
    yTranslate: 7,
  },
  {
    text: "Real-time",
    color: COLORS.cyan,
    rotation: 6,
    yTranslate: 7,
  },
  {
    text: "Pagination",
    color: COLORS.orange,
    rotation: 12,
    yTranslate: 10,
  },
];

export const getTagProps = (tag: string): T_TAG_PROPS | undefined => {
  return TAGS_PROPS.find((t) => t.text === tag);
};
