import { Graph } from '../graph';

export interface PluginOption {
  [key: string]: any;
}

export interface GPlugin {
  option: PluginOption;

  invoke(graph: Graph): void;

  get(key: string): void;

  set(key: string, value: any): void;

  destroy(): void;
}
