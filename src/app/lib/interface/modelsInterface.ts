import { Item } from '../shape/item';
import { Node } from '../shape/nodes';

export interface BBox {
  x: number;
  y: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

export type LabelStyle = Partial<{
  [key: string]: unknown;
  rotate: number;
  textAlign: string;
  angle: number;
  x: number;
  y: number;
  text: string;
  color: string;
  stroke: string | null;
  opacity: number;
  fontSize: number;
  fontStyle: string;
  fill: string | null;
  rotateCenter: string;
  lineWidth?: number;
}>;

export type ILabelConfig = Partial<{
  position: string;
  offset: number;
  refX: number;
  refY: number;
  autoRotate: boolean;
  style: LabelStyle;
}>;

export type ModelStyle = Partial<{
  style: any;
  labelStyle: LabelStyle;
}>;

export interface ModelConfig extends ModelStyle {
  [key: string]: unknown;
  // 节点或边的类型
  type?: string;
  label?: string;
  groupId?: string;
  description?: string;
  x?: number;
  y?: number;
}

type ColorType = string | null;
export interface ShapeAttrs {
  /** x 坐标 */
  x?: number;
  /** y 坐标 */
  y?: number;
  /** 圆半径 */
  radius?: number | number[];
  /** 描边颜色 */
  stroke?: ColorType;
  /** 描边透明度 */
  strokeOpacity?: number;
  /** 填充颜色 */
  fill?: ColorType;
  /** 填充透明度 */
  fillOpacity?: number;
  /** 整体透明度 */
  opacity?: number;
  /** 线宽 */
  lineWidth?: number;
  /** 线宽 */
  width?: number;
  /** 线宽 */
  height?: number;
  /** 其他 */
  [key: string]: any;
}

export interface ShapeModelOption extends ModelStyle {
  [key: string]: unknown;
}

export interface ShapeOption {
  [key: string]: unknown;
  options?: ShapeModelOption;
  draw?: (ctx: CanvasRenderingContext2D, item: Node | Item) => void;
}
export interface NodeConfig extends ModelConfig {
  id?: string;
  width: number;
  height: number;
  shapeName?: string;
}

export interface EdgeConfig extends ModelConfig {
  id: string;
  source?: string;
  target?: string;
  sourceNode?: Node;
  targetNode?: Node;
}

export type ItemConfig = NodeConfig | EdgeConfig;
