import { GObject } from './interface';
import { isBrowser } from '../../utils';

const PX_SUFFIX = 'px';

export abstract class AbstractCanvas {

  public canvasElement: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  public option: GObject;

  constructor(option: any) {
    this.init(option);
  }

  private init(option: any) {
    this.option = Object.assign({}, option);
    this.initCanvas();
  }

  public initCanvas() {
    this.canvasElement = this.createCanvas();
    this.ctx = this.getCanvasContext();
    // 附加到容器
    const container = this.get('container');
    container.appendChild(this.canvasElement);
    // 设置初始宽度
    this.setCanvasSize(this.get('width'), this.get('height'));
  }

  abstract createCanvas(): HTMLCanvasElement;

  /**
   * 修改画布对应的 DOM 的大小
   * @param {number} width  宽度
   * @param {number} height 高度
   */
  public setCanvasSize(width: number, height: number) {
    const el = this.canvasElement;
    if (isBrowser) {
      el.style.width = width + PX_SUFFIX;
      el.style.height = height + PX_SUFFIX;
    }
  }

  public getCanvasContext() {
    const context = this.canvasElement.getContext('2d');
    return context;
  }

  public getContext(): CanvasRenderingContext2D | null {
    return this.ctx;
  }

  public getCanvasElement(): HTMLCanvasElement {
    return this.canvasElement;
  }

  public get(key: string) {
    return this.option[key];
  }

  public set(key: string, value: any) {
    this.option[key] = value;
  }
}
