import { AnyObject } from 'src/app/lib/interface';
import { Graph } from '../graph';

export class ItemBase {

  public cfg: AnyObject;

  public graph: Graph;

  public container: HTMLDivElement;

  public canvas: HTMLCanvasElement;

  public bbox: any;

  constructor(cfg: any) {
    this.cfg = Object.assign(this.getDefaultCfg(), cfg);

    if (cfg.graph) {
      this.graph = cfg.graph;
    }

    this.init();
    this.draw();
  }

  protected getDefaultCfg() {
    return {};
  }

  public init() {
    const container = this.initContainer();
    const canvas = this.initCanvas();
    container.appendChild(canvas);
    this.bbox = this.getBBox();
  }

  public initContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.top = '0';
    container.style.outline = 'none';
    container.style.border = '1px solid #222';
    this.container = container;
    this.set('container', container);
    return container;
  }

  public initCanvas() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    this.canvas = canvas;
    this.set('context', context);
    return canvas;
  }

  /** 修改dom元素的大小 */
  public setDOMSize(width: number, height: number) {
    this.setCanvasDomSize(width, height);
    this.setContainerDomSize(width, height);
  }

  /** 修改容器尺寸和位置 */
  public setContainerDomSize(width: number, height: number) {
    this.container.style.width = `${width}px`;
    this.container.style.height = `${height}px`;
  }

  /** 修改画布尺寸 */
  public setCanvasDomSize(width: number, height: number) {
    const context = this.get('context');
    const canvas = this.canvas;
    const pixelRatio = this.getPixelRatio();
    canvas.width = pixelRatio * width;
    canvas.height = pixelRatio * height;
    // 设置 canvas 元素的宽度和高度，会重置缩放，因此 context.scale 需要在每次设置宽、高后调用
    if (pixelRatio > 1) {
      context.scale(pixelRatio, pixelRatio);
    }
  }

  /** 修改位置 */
  public setPosition() {
    this.setContainerPosition();
    this.setCanvasPosition();
  }

  /** 修改容器位置 */
  public setContainerPosition() {
    const bbox = this.bbox;
    this.container.style.left = `${bbox.minX}px`;
    this.container.style.top = `${bbox.minY}px`;
    this.container.style.right = `${bbox.maxX}px`;
    this.container.style.bottom = `${bbox.maxY}px`;
    this.container.style.width = `${bbox.width}px`;
    this.container.style.height = `${bbox.height}px`;
  }

  /** 修改画布位置 */
  public setCanvasPosition() {
    const bbox = this.bbox;
    this.canvas.style.left = `${bbox.minX}px`;
    this.canvas.style.top = `${bbox.minY}px`;
    this.canvas.style.right = `${bbox.maxX}px`;
    this.canvas.style.bottom = `${bbox.maxY}px`;
    this.canvas.width = bbox.width;
    this.canvas.height = bbox.height;
  }

  /**
   * 获取屏幕像素比
   */
  getPixelRatio() {
    const pixelRatio = this.get('pixelRatio') || (window.devicePixelRatio || 1);
    // 不足 1 的取 1，超出 1 的取整
    return pixelRatio >= 1 ? Math.floor(pixelRatio) : 1;
  }

  public draw() {}

  public get(key: string) {
    return this.cfg[key];
  }

  public set(key: string, value: any) {
    this.cfg[key] = value;
  }

  public getBBox() {
    const x = this.get('x') || 0;
    const y = this.get('y') || 0;
    const width = this.get('width');
    const height = this.get('height');
    const bbox = {
      x: x >> 0,
      y: y >> 0,
      width: width >> 0,
      height: height >> 0,
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height,
    };
    return bbox;
  }
}
