type T_CREATE_SVG = {
  canvasWidth: number;
  canvasHeight: number;
  children: React.ReactNode;
} & React.SVGProps<SVGSVGElement>;

export const CreateSvg = ({ canvasWidth, canvasHeight, children, ...props }: T_CREATE_SVG) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} {...props}>
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

export const SvgBox = ({ x, y, width, height, stroke = "var(--color-border)", fill = "transparent", radius = 8, strokeWidth = 1, dashed = false }: T_SVG_BOX) => {
  return (
    <>
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        fill={fill}
        fillOpacity={0.5}
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

export const SvgHorizontalLine = ({ point, size, color = "var(--color-border)", strokeWidth = 1 }: T_SVG_HORIZONTAL_LINE) => {
  return (
    <>
      <line x1={0} x2={size} y1={point} y2={point} stroke={color} strokeWidth={strokeWidth} />
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

export const SvgVerticalLine = ({ point, y1 = 0, y2 = 0, size, color = "var(--color-border)", strokeWidth = 1 }: T_SVG_VERTICAL_LINE) => {
  y2 = y2 == 0 ? size : y2;
  return <line x1={point} x2={point} y1={y1} y2={y2} stroke={color} strokeWidth={strokeWidth} />;
};
