
export type ShapeStyle = Partial<{
  x: number;
  y: number;
  r: number;
  width: number;
  height: number;
  offset: number | number[];
  stroke: string | null;
  strokeOpacity: number;
  fill: string | null;
  fillOpacity: number;
  lineWidth: number;
  lineAppendWidth: number;
  lineDash: number[];
  path: string | object[];
  points: object[];
  matrix: number[];
  opacity: number;
  size: number | number[];
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  cursor: string;
  position: string;
  fontSize: number;
}>;

export interface ShapeOption {
  name?: string;
  option: object;
  draw: (ctx: CanvasRenderingContext2D, option: any) => void;
  // update: (ctx: CanvasRenderingContext2D, option: any) => void;
  [key: string]: any;
}
