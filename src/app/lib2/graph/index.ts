import { Element } from '../core/element';
import EventEmitter from '../core/emitter';
import mix from '../util/mix';
import { AnyObject } from '../core/interface';
import { Node } from '../item/node';


export class Graph extends EventEmitter {

  public element: Element;

  public container: HTMLElement;

  public cfg: AnyObject;

  public nodes: Node[] = [];

  constructor(cfg: any) {
    super();
    const defaultCfg = this.getDefaultCfg();
    this.cfg = mix(defaultCfg, cfg);
    this.init();
  }

  private getDefaultCfg() {
    return {};
  }

  private init() {

    const container = this.get('container');
    this.container = container;

    this.initElement();
  }

  public initElement() {
    const width: number = this.get('width');
    const height: number = this.get('height');
    this.element = new Element({
      container: this.container,
      width,
      height,
    });
  }

  public render() {
    console.log('绘制元素');
  }

  public addItem(cfg: any) {
    const container = this.get('container');
    cfg.graph = this;
    const node = new Node(cfg);
  }

  public appendElement = (element: HTMLElement) => {
    this.container.appendChild(element);
  }

  public get(key: string) {
    return this.cfg[key];
  }

  public set(key: string, value: any) {
    this.cfg[key] = value;
  }

}
