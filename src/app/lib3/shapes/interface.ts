export interface ShapeOption {
  name?: string;
  option: object;
  draw: () => void;
  update: () => void;
  [key: string]: any;
}
