import { PluginOption } from '../../interface';
import { Graph } from '../../graph';
import { GPlugin } from '../../interface';

export abstract class PluginCore implements GPlugin {

  public option: PluginOption;

  constructor(option?: PluginOption) {
    this.option = option || {};
  }

  /** 激活函数,由 Graph 内部激活,并触发 初始化函数 */
  public invoke(graph: Graph) {
    this.set('graph', graph);
    this.initPlugin();
  }

  /** 设置绑定事件 */
  abstract initPlugin(): void;

  public get(key: string) {
    return this.option[key];
  }

  public set(key: string, value: any) {
    this.option[key] = value;
  }

  public destroy() {
    this.option = undefined;
  }
}
