import { ShapeStyle } from './shape';

export interface ItemModel {
  x: number;
  y: number;
  // 用于存放数据
  data: object;
  [key: string]: unknown;
}

export interface ModelStyle extends ShapeStyle {
  
}
