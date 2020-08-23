import { Container } from '../core/container';
import { Canvas } from '../core/canvas';
import { GraphOption } from '../interface';

export abstract class GraphBase extends Container {
  public canvas: Canvas;
  public activeCanvas: Canvas;

  constructor(option: GraphOption) {
    super(option);
    this.initGraph();
  }

  private initGraph() {
    this.initGraphContainer();
    this.initEvent();
    this.initPlugins();
    this.subscript();
  }

  private initGraphContainer() {
    const size = this.getSize();
    const container = this.get('container');
    const behaviorLayer = this.createDivElement();
    this.canvas = new Canvas({ ...size, container });
    this.activeCanvas = new Canvas({ ...size, container });
    this.appendElement(behaviorLayer);
    this.set('behaviorLayer', behaviorLayer);
  }

  abstract initEvent(): void;

  abstract subscript(): void;

  abstract initPlugins(): void;

  public packHitShape<T>(shape: T, type: string): { type: string; shape: T; } {
    return {type, shape};
  }

  public changeSize(width: number, height: number) {
    const size = this.getSize();
    this.set('width', width || size.width);
    this.set('height', height || size.height);
  }

  /** canvas 变形矩阵 */
  public transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    const ctx = this.canvas.ctx;
    ctx.transform(a, b, c, d, e, f);
  }

  /** canvas 移动 */
  public translate(x: number, y: number, matrix?: boolean) {
    if (matrix) {
      this.transform(1, 0, 0, 1, x, y);
      return null;
    }
    const ctx = this.canvas.ctx;
    ctx.translate(x, y);
  }

  /** canvas 缩放 */
  public scale(sx: number, sy?: number, matrix?: boolean) {
    const scaleY = sy ? sy : sx;
    if (matrix) {
      this.transform(sx, 0, 0, scaleY, 0, 0);
      return null;
    }
    const ctx = this.canvas.ctx;
    ctx.scale(sx, scaleY);
  }

  /** canvas 旋转 */
  public rotate(angle: number, matrix?: boolean) {
    if (matrix) {
      this.transform(
        Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180),
        Math.sin(angle * Math.PI / 180), Math.cos(angle * Math.PI / 180),
        0, 0
      );
      return null;
    }
    const ctx = this.canvas.ctx;
    ctx.rotate(angle);
  }
}
