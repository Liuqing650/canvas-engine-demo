export interface ShapeOption {
  name?: string;
  option: object;
  draw: (ctx: CanvasRenderingContext2D, option: any) => void;
  // update: (ctx: CanvasRenderingContext2D, option: any) => void;
  [key: string]: any;
}
