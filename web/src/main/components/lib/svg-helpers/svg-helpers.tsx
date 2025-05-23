import { COLORS } from "../graphics/library/query-patterns/components/utils/colors";

type T_CREATE_SVG = {
  canvasWidth: number;
  canvasHeight: number;
  children: React.ReactNode;
} & React.SVGProps<SVGSVGElement>;

const Root = ({ canvasWidth, canvasHeight, children, ...props }: T_CREATE_SVG) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      {...props}
    >
      {children}
    </svg>
  );
};

export type T_SVG_BOX = {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke?: string;
  fill?: string;
  radius?: number;
  strokeWidth?: number;
  dashed?: boolean;
};

const Box = ({ x, y, width, height, stroke = COLORS.border, fill = "transparent", radius = 8, strokeWidth = 1, dashed = false }: T_SVG_BOX) => {
  return (
    <>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={0.4}
        stroke={stroke}
        strokeDasharray={dashed ? 20 / 6 : undefined}
        strokeWidth={strokeWidth}
        rx={radius}
        ry={radius}
      />
    </>
  );
};

export type T_SVG_HORIZONTAL_LINE = {
  point: number;
  size: number;
  color?: string;
  strokeWidth?: number;
};

const HorizontalLine = ({ point, size, color = COLORS.border, strokeWidth = 1 }: T_SVG_HORIZONTAL_LINE) => {
  return (
    <>
      <line
        x1={0}
        x2={size}
        y1={point}
        y2={point}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </>
  );
};

export type T_SVG_VERTICAL_LINE = {
  point: number;
  y1?: number;
  y2?: number;
  size: number;
  color?: string;
  strokeWidth?: number;
};

const VerticalLine = ({ point, y1 = 0, y2 = 0, size, color = COLORS.border, strokeWidth = 1 }: T_SVG_VERTICAL_LINE) => {
  y2 = y2 == 0 ? size : y2;
  return (
    <line
      x1={point}
      x2={point}
      y1={y1}
      y2={y2}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  );
};

export const SVG = {
  Root: Root,
  Box: Box,
  HorizontalLine: HorizontalLine,
  VerticalLine: VerticalLine,
};
