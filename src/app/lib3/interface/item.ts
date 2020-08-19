import { ShapeStyle } from './shape';

export interface ItemOption {
  id?: string;
  x: number;
  y: number;
  // 用于存放数据
  data?: object;
  [key: string]: unknown;
}

export interface ModelStyle extends ShapeStyle {
  allow?: boolean;
}

export interface NodeOption extends ItemOption {
  shapeName: string;
  width: number;
  height: number;
}
