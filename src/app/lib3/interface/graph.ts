import { NodeOption } from './item';

export interface GraphData {
  nodes: NodeOption[];
}

export interface GraphOption {
  container: string | HTMLElement;
  width: number;
  height: number;
}
