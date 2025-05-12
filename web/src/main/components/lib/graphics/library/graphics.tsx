import { GraphicImage } from "../graphic-image/graphic-image";
import { HeroRender } from "./hero/render/hero-render";
import { HeroSvg } from "./hero/svg/hero-svg";
import { QueryPatternRender } from "./query-patterns/render/query-pattern-render";
import { QueryPatternSvg } from "./query-patterns/svg/query-pattern-svg";

export const Graphics = {
  QueryPatterns: {
    Render: QueryPatternRender,
    Svg: QueryPatternSvg,
  },
  Hero: {
    Render: HeroRender,
    Svg: HeroSvg,
  },
  Image: GraphicImage,
};
