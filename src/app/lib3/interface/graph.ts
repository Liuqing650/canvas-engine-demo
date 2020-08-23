import { NodeOption } from './item';
import { GPlugin } from './expand';

export interface GraphData {
  nodes: NodeOption[];
}

export interface GraphOption {
  container: string | HTMLElement;
  width: number;
  height: number;
  plugins?: GPlugin[];
}
